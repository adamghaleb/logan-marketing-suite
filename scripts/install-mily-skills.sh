#!/usr/bin/env bash
# install-mily-skills.sh
# One-shot installer for the Mily skills bundle.
# Drops every skills/logan-* folder into ~/.claude/skills (or $CLAUDE_HOME/skills).
# Built for Mily by Adam. Safe to run twice — never overwrites existing skills.

set -euo pipefail

REPO_URL="https://github.com/adamghaleb/logan-marketing-suite.git"
SKILLS_DIR="${CLAUDE_HOME:-$HOME/.claude}/skills"
TMP_DIR="$(mktemp -d -t mily-skills-XXXXXX)"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

say()  { printf '%s\n' "$*"; }
warn() { printf '%s\n' "$*" >&2; }
hr()   { printf '\n'; }

# ---- platform detection ----------------------------------------------------
case "$(uname -s 2>/dev/null || echo unknown)" in
  Darwin)
    PLATFORM="macOS"
    ;;
  Linux)
    PLATFORM="Linux"
    ;;
  MINGW*|MSYS*|CYGWIN*)
    PLATFORM="Windows-bash"
    ;;
  *)
    warn "Hi, Mily — this installer needs macOS, Linux, or a Unix-style shell."
    warn "On Windows, please use Git Bash or WSL (Windows Subsystem for Linux),"
    warn "then run this same command inside that terminal. You're a few minutes away."
    exit 1
    ;;
esac

# ---- prerequisite checks ---------------------------------------------------
need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    warn "Missing tool: $1"
    warn "  Install it and try again. On macOS: 'brew install $1'."
    warn "  On Linux: use your package manager (apt, dnf, pacman)."
    exit 1
  fi
}
need git

hr
say "Hello, Mily. Installing your Logan skills."
say "  Platform : $PLATFORM"
say "  Skills go: $SKILLS_DIR"
hr

mkdir -p "$SKILLS_DIR"

# ---- clone the repo --------------------------------------------------------
say "Cloning the suite from GitHub (this is fast)..."
if git clone --depth 1 --quiet "$REPO_URL" "$TMP_DIR/repo" 2>/dev/null; then
  say "  good — that worked."
else
  warn "  Could not reach GitHub. Check your internet and try again."
  warn "  Repo: $REPO_URL"
  exit 1
fi

SRC_SKILLS="$TMP_DIR/repo/skills"

# ---- handle "no skills present yet" ----------------------------------------
if [ ! -d "$SRC_SKILLS" ]; then
  hr
  say "The skills folder isn't in the repo yet — that means the team is still"
  say "publishing them. Nothing was changed on your computer. You can re-run"
  say "this same command later and it'll pick up whatever is ready."
  exit 0
fi

# Collect logan-* directories without relying on shell globbing.
LOGAN_SKILLS=()
while IFS= read -r path; do
  [ -n "$path" ] || continue
  LOGAN_SKILLS+=("$path")
done < <(find "$SRC_SKILLS" -mindepth 1 -maxdepth 1 -type d -name 'logan-*' 2>/dev/null | sort)

if [ "${#LOGAN_SKILLS[@]}" -eq 0 ]; then
  hr
  say "Found the repo, but no logan-* skills are published yet."
  say "Nothing was changed. Try this command again in a day or two."
  exit 0
fi

# ---- copy skills, never overwrite ------------------------------------------
INSTALLED=()
SKIPPED=()

for src in "${LOGAN_SKILLS[@]}"; do
  name="$(basename "$src")"
  dst="$SKILLS_DIR/$name"
  if [ -e "$dst" ]; then
    SKIPPED+=("$name")
    say "  - $name already exists — leaving your version alone."
    continue
  fi
  cp -R "$src" "$dst"
  INSTALLED+=("$name")
  say "  + installed $name"
done

# ---- friendly summary ------------------------------------------------------
hr
say "You're all set, Mily."
say "  Installed : ${#INSTALLED[@]}"
say "  Skipped   : ${#SKIPPED[@]} (already on your machine)"
hr

if [ "${#INSTALLED[@]}" -gt 0 ] || [ "${#SKIPPED[@]}" -gt 0 ]; then
  say "Try one of these in Claude Code or with Bingus:"
  say "  - \"help me build a Things-To-Do page for a Hudson Valley B&B\""
  say "  - \"write me 3 meta description options for an inn home page\""
  say "  - \"QA this page before I hand it off to PM\""
  say "  - \"give me a section plan for a Rooms page\""
  say "  - \"this Elementor page is broken on mobile — what should I check?\""
  hr
  say "Claude will pick the right skill automatically. Just talk normally."
fi

if [ "${#SKIPPED[@]}" -gt 0 ]; then
  hr
  say "Note on skipped skills: this installer never overwrites what's already"
  say "there. If you want a fresh copy, delete the folder under:"
  say "  $SKILLS_DIR"
  say "and run this command again."
fi

hr
say "Done. Have a good build."
