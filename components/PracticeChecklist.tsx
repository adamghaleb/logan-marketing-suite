"use client";

import { useEffect, useState } from "react";

interface PracticeChecklistProps {
  readonly id: string;
  readonly items: ReadonlyArray<string>;
}

const STORAGE_PREFIX = "mily-practice-";

function readStoredState(
  storageKey: string,
  expectedLength: number,
): boolean[] {
  if (typeof window === "undefined") {
    return new Array(expectedLength).fill(false);
  }
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return new Array(expectedLength).fill(false);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return new Array(expectedLength).fill(false);
    }
    const normalized = new Array(expectedLength).fill(false);
    for (let index = 0; index < expectedLength; index += 1) {
      normalized[index] = Boolean(parsed[index]);
    }
    return normalized;
  } catch {
    return new Array(expectedLength).fill(false);
  }
}

function writeStoredState(storageKey: string, state: ReadonlyArray<boolean>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // localStorage may be unavailable (private mode, quota); fail silently
  }
}

export function PracticeChecklist({ id, items }: PracticeChecklistProps) {
  const storageKey = `${STORAGE_PREFIX}${id}`;
  const [checked, setChecked] = useState<boolean[]>(() =>
    new Array(items.length).fill(false),
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setChecked(readStoredState(storageKey, items.length));
    setHydrated(true);
  }, [storageKey, items.length]);

  function toggleAt(index: number) {
    setChecked((current) => {
      const next = current.slice();
      next[index] = !next[index];
      writeStoredState(storageKey, next);
      return next;
    });
  }

  const completedCount = checked.filter(Boolean).length;

  return (
    <div className="practice-checklist" data-hydrated={hydrated}>
      <div className="practice-checklist-meta">
        <span>
          {completedCount} of {items.length} done
        </span>
        <span aria-hidden>·</span>
        <span>saved on this device</span>
      </div>
      <ul className="practice-checklist-list">
        {items.map((label, index) => {
          const isChecked = checked[index] === true;
          const inputId = `${id}-task-${index}`;
          return (
            <li
              key={inputId}
              className="practice-checklist-item"
              data-checked={isChecked}
            >
              <label htmlFor={inputId}>
                <input
                  id={inputId}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAt(index)}
                />
                <span className="practice-checklist-box" aria-hidden="true">
                  <svg
                    viewBox="0 0 16 16"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3.2 3.2L13 4.8" />
                  </svg>
                </span>
                <span className="practice-checklist-text">{label}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <style>{`
        .practice-checklist {
          margin-top: 18px;
        }
        .practice-checklist-meta {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--ink-3);
          padding: 4px 10px;
          border: 1px dashed var(--line);
          border-radius: 99px;
          margin-bottom: 14px;
        }
        .practice-checklist-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .practice-checklist-item label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--paper);
          cursor: pointer;
          transition: border-color 120ms ease, background 120ms ease;
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.5;
          color: var(--ink);
        }
        .practice-checklist-item label:hover {
          border-color: var(--lavigo-200);
          background: var(--lavigo-50);
        }
        .practice-checklist-item input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 0;
          height: 0;
        }
        .practice-checklist-box {
          flex: 0 0 auto;
          width: 20px;
          height: 20px;
          margin-top: 2px;
          border: 1.5px solid var(--lavigo-400);
          border-radius: 6px;
          background: var(--paper-2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: transparent;
          transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
        }
        .practice-checklist-item label:focus-within .practice-checklist-box {
          outline: 2px solid var(--lavigo-200);
          outline-offset: 2px;
        }
        .practice-checklist-item[data-checked="true"] .practice-checklist-box {
          background: var(--lavigo-600);
          border-color: var(--lavigo-600);
          color: var(--paper);
        }
        .practice-checklist-text {
          flex: 1 1 auto;
        }
        .practice-checklist-item[data-checked="true"] .practice-checklist-text {
          text-decoration: line-through;
          opacity: 0.55;
        }
      `}</style>
    </div>
  );
}
