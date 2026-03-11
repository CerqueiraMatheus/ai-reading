import { getWeek, weeks } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const week = getWeek(params.slug);
	if (!week) throw error(404, 'Semana não encontrada');
	return { week };
};

export function entries() {
	return weeks.map((w) => ({ slug: w.slug }));
}
