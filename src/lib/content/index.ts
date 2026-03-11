import type { Week, Paper } from '$lib/types';
import type { Component } from 'svelte';

interface WeekJson {
	number: number;
	title: string;
	description: string;
	publishedAt: string;
	papers: Paper[];
}

const weekJsonModules = import.meta.glob<WeekJson>('/content/*/week.json', { eager: true, import: 'default' });
const deepDiveModules = import.meta.glob('/content/*/*.md');

function slugFromPath(path: string): string {
	const match = path.match(/\/content\/([^/]+)\//);
	return match ? match[1] : '';
}

function buildWeeks(): Week[] {
	const result: Week[] = [];

	for (const [path, data] of Object.entries(weekJsonModules)) {
		const slug = slugFromPath(path);
		result.push({ slug, ...data });
	}

	result.sort((a, b) => a.number - b.number);
	return result;
}

export const weeks: Week[] = buildWeeks();

export function getCurrentWeek(): Week {
	const now = new Date();
	const published = weeks.filter((w) => new Date(w.publishedAt) <= now);
	return published.length > 0 ? published[published.length - 1] : weeks[0];
}

export function getWeek(slug: string): Week | undefined {
	return weeks.find((w) => w.slug === slug);
}

export function getPaper(weekSlug: string, paperId: string): { week: Week; paper: Paper } | undefined {
	const week = getWeek(weekSlug);
	if (!week) return undefined;
	const paper = week.papers.find((p) => p.id === paperId);
	if (!paper) return undefined;
	return { week, paper };
}

export async function getDeepDive(weekSlug: string, paperId: string): Promise<Component | null> {
	const path = `/content/${weekSlug}/${paperId}.md`;
	const loader = deepDiveModules[path];
	if (!loader) return null;
	try {
		const mod = (await loader()) as Record<string, unknown>;
		return (mod.default as Component) ?? null;
	} catch {
		return null;
	}
}
