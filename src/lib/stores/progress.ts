import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { PaperRef, WeekRef } from '$lib/types';

const STORAGE_KEY = 'ai-reading-progress';

interface ProgressState {
	completedPapers: string[];
}

function paperKey(weekSlug: string, paperId: string): string {
	return `${weekSlug}/${paperId}`;
}

function isProgressState(value: unknown): value is ProgressState {
	if (typeof value !== 'object' || value === null) return false;
	const obj = value as Record<string, unknown>;
	return Array.isArray(obj.completedPapers) &&
		obj.completedPapers.every((item: unknown) => typeof item === 'string');
}

function loadProgress(): ProgressState {
	if (!browser) return { completedPapers: [] };
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed: unknown = JSON.parse(stored);
			if (isProgressState(parsed)) return parsed;
		}
	} catch {
		// Ignore parse errors from corrupted localStorage data.
	}
	return { completedPapers: [] };
}

function createProgressStore() {
	const { subscribe, set, update } = writable<ProgressState>(loadProgress());

	if (browser) {
		subscribe((state) => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		});
	}

	return {
		subscribe,
		markPaperDone(weekSlug: string, paperId: string): void {
			const key = paperKey(weekSlug, paperId);
			update((state) => {
				if (state.completedPapers.includes(key)) return state;
				return { completedPapers: [...state.completedPapers, key] };
			});
		},
		isPaperDone(completedPapers: string[], weekSlug: string, paperId: string): boolean {
			return completedPapers.includes(paperKey(weekSlug, paperId));
		},
		isPaperUnlocked(completedPapers: string[], weekSlug: string, paperId: string, weekPapers: PaperRef[]): boolean {
			const paper = weekPapers.find((p) => p.id === paperId);
			if (!paper) return false;
			if (paper.order === 1) return true;
			const prev = weekPapers.find((p) => p.order === paper.order - 1);
			if (!prev) return true;
			return completedPapers.includes(paperKey(weekSlug, prev.id));
		},
		isWeekDone(completedPapers: string[], weekSlug: string, weekPapers: PaperRef[]): boolean {
			return weekPapers.every((p) => completedPapers.includes(paperKey(weekSlug, p.id)));
		},
		isWeekUnlocked(completedPapers: string[], weekIndex: number, allWeeks: WeekRef[]): boolean {
			if (weekIndex === 0) return true;
			const prev = allWeeks[weekIndex - 1];
			return prev.papers.every((p) => completedPapers.includes(paperKey(prev.slug, p.id)));
		},
		reset(): void {
			set({ completedPapers: [] });
		}
	};
}

export const progress = createProgressStore();
