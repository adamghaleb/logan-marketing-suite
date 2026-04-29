#!/usr/bin/env bash
# smoke-test.sh — quick sanity check for a deployed Logan Marketing Suite (Mily) environment.
#
# Usage:
#   ./scripts/smoke-test.sh                                                     # defaults to https://logan-marketing-suite.vercel.app
#   ./scripts/smoke-test.sh https://logan-marketing-suite.vercel.app            # check production
#   BASE_URL=https://logan-marketing-suite-git-staging.vercel.app ./scripts/smoke-test.sh
#
# What it checks (in plain English):
#   1. The front door — does the home page load and look like Mily's site?
#   2. Mily's API — does the bingus chat endpoint answer (or politely say "not deployed yet")?
#   3. The install script — does /install.sh return a real bash script?
#
# All HTTP calls retry 3 times with exponential backoff (1s, 2s, 4s) plus a small
# jitter, and only retry on 5xx or network errors — never on 4xx (per CLAUDE.md).

set -euo pipefail

BASE_URL="${1:-${BASE_URL:-https://logan-marketing-suite.vercel.app}}"
BASE_URL="${BASE_URL%/}"

color() { printf "\033[%sm%s\033[0m" "$1" "$2"; }
say()   { printf "%s %s\n" "$(color 36 "·")" "$*"; }
ok()    { printf "%s %s\n" "$(color 32 "✓")" "$*"; }
warn()  { printf "%s %s\n" "$(color 33 "!")" "$*"; }
fail()  { printf "%s %s\n" "$(color 31 "✗")" "$*" >&2; exit 1; }

# --- retrying curl ---------------------------------------------------------
# Args: <method> <url> [body] [extra-curl-flag ...]
# Writes response body to stdout. The HTTP status code is appended on the very
# last line as "STATUS=<code>" so the caller can parse it.
retry_curl() {
  local method="$1"; shift
  local url="$1";    shift
  local body=""
  if [[ "$method" == "POST" || "$method" == "PUT" || "$method" == "PATCH" ]]; then
    body="${1:-}"; shift || true
  fi

  local max_attempts=3
  local delay=1
  local attempt=1
  local tmp_body status curl_exit

  tmp_body="$(mktemp -t smoke-body.XXXXXX)"
  trap 'rm -f "$tmp_body"' RETURN

  while (( attempt <= max_attempts )); do
    : > "$tmp_body"
    set +e
    if [[ -n "$body" ]]; then
      status="$(curl --silent --show-error \
        --max-time 20 \
        --output "$tmp_body" \
        --write-out '%{http_code}' \
        --request "$method" \
        --header 'Content-Type: application/json' \
        --data "$body" \
        "$@" \
        "$url")"
    else
      status="$(curl --silent --show-error \
        --max-time 20 \
        --output "$tmp_body" \
        --write-out '%{http_code}' \
        --request "$method" \
        "$@" \
        "$url")"
    fi
    curl_exit=$?
    set -e

    # Network failure (curl_exit != 0) or 5xx → retry. 4xx and 2xx → return.
    if (( curl_exit == 0 )) && [[ "$status" =~ ^[0-9]+$ ]] && (( status < 500 )); then
      cat "$tmp_body"
      printf "\nSTATUS=%s\n" "$status"
      return 0
    fi

    if (( attempt == max_attempts )); then
      cat "$tmp_body"
      printf "\nSTATUS=%s\n" "${status:-000}"
      return 0
    fi

    local jitter=$(( RANDOM % 250 ))
    warn "attempt $attempt failed (curl_exit=$curl_exit status=${status:-network}). retrying in ${delay}s + ${jitter}ms..."
    sleep "$(awk "BEGIN { printf \"%.3f\", $delay + $jitter/1000 }")"
    delay=$(( delay * 2 ))
    attempt=$(( attempt + 1 ))
  done
}

extract_status() { tail -n 1 | sed 's/^STATUS=//'; }
extract_body()   { sed '$d'; }

# --- 1. front door ---------------------------------------------------------
say "checking the front door at ${BASE_URL}/ ..."
home_resp="$(retry_curl GET "${BASE_URL}/")"
home_status="$(printf '%s\n' "$home_resp" | extract_status)"
home_body="$(printf '%s\n' "$home_resp"   | extract_body)"

if [[ "$home_status" != "200" ]]; then
  fail "home page returned $home_status (expected 200). Is the app actually deployed?"
fi
if ! printf '%s' "$home_body" | grep -qiE 'mily|logan marketing suite'; then
  warn "home page returned 200 but didn't mention 'Mily' or 'Logan Marketing Suite' in the HTML. Double-check the title."
else
  ok "front door looks right (200 + Mily/Logan Marketing Suite in the page)"
fi

# --- 2. Mily's API ---------------------------------------------------------
say "checking Mily's API at ${BASE_URL}/api/bingus/chat ..."
chat_payload='{"messages":[{"role":"user","content":"smoke test ping"}]}'
chat_resp="$(retry_curl POST "${BASE_URL}/api/bingus/chat" "$chat_payload")"
chat_status="$(printf '%s\n' "$chat_resp" | extract_status)"
chat_body="$(printf '%s\n' "$chat_resp"   | extract_body)"

case "$chat_status" in
  200)
    if [[ -z "$chat_body" ]]; then
      fail "Mily's API returned 200 but the body is empty. Expected JSON like { \"message\": \"...\" }."
    fi
    if ! printf '%s' "$chat_body" | grep -q '"message"'; then
      warn "API returned 200 but the JSON didn't include a 'message' field. Inspect the response."
    fi
    ok "Mily's API responding (200 with JSON body)"
    ;;
  404)
    warn "API not deployed yet — skipping (got 404 from /api/bingus/chat). That's fine for an early environment."
    ;;
  *)
    fail "API returned $chat_status. That's neither 'working' nor 'not built yet' — investigate."
    ;;
esac

# --- 3. install script -----------------------------------------------------
say "checking the install script at ${BASE_URL}/install.sh ..."
install_resp="$(retry_curl GET "${BASE_URL}/install.sh")"
install_status="$(printf '%s\n' "$install_resp" | extract_status)"
install_body="$(printf '%s\n' "$install_resp"   | extract_body)"

if [[ "$install_status" != "200" ]]; then
  fail "install.sh returned $install_status (expected 200). The Vercel rewrite may be misconfigured."
fi

first_line="$(printf '%s\n' "$install_body" | head -n 1)"
if [[ "$first_line" != \#!/* ]]; then
  fail "install.sh did not start with a '#!' shebang. First line was: $first_line"
fi
if ! printf '%s' "$install_body" | grep -qiE 'mily|claude'; then
  warn "install.sh has a shebang but didn't mention 'mily' or 'claude'. Double-check it's the right script."
else
  ok "install script looks like a real bash script"
fi

# --- done ------------------------------------------------------------------
ok "you're good — all smoke checks passed against ${BASE_URL}"
