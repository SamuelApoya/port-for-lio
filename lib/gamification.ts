"use client";

import confetti from "canvas-confetti";

const STORAGE_KEY = "site_gamification_v1";

interface GamificationState {
  visitedSections: string[];
  streak: number;
  lastVisit: string | null;
  achievements: string[];
}

function loadState(): GamificationState {
  if (typeof window === "undefined") {
    return { visitedSections: [], streak: 0, lastVisit: null, achievements: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("no state");
    return JSON.parse(raw);
  } catch {
    return { visitedSections: [], streak: 0, lastVisit: null, achievements: [] };
  }
}

function saveState(state: GamificationState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function recordVisit(): GamificationState {
  const state = loadState();
  const today = new Date().toDateString();

  if (state.lastVisit !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = state.lastVisit === yesterday.toDateString() ? state.streak + 1 : 1;
    state.lastVisit = today;
  }

  saveState(state);
  return state;
}

export function markSectionVisited(section: string): {
  state: GamificationState;
  isNew: boolean;
  unlocked: string | null;
} {
  const state = loadState();
  const isNew = !state.visitedSections.includes(section);

  if (isNew) {
    state.visitedSections.push(section);
  }

  let unlocked: string | null = null;
  if (state.visitedSections.length >= 3 && !state.achievements.includes("explorer")) {
    state.achievements.push("explorer");
    unlocked = "explorer";
    fireConfetti();
  }

  saveState(state);
  return { state, isNew, unlocked };
}

export function fireConfetti() {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.7 },
    colors: ["#8b7dff", "#eaf2ff", "#151018"],
  });
}

export function getState(): GamificationState {
  return loadState();
}