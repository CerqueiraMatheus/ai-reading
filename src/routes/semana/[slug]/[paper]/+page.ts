import { getPaper, getDeepDive, weeks } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const result = getPaper(params.slug, params.paper);
	if (!result) throw error(404, 'Artigo não encontrado');

	const deepDiveComponent = await getDeepDive(params.slug, params.paper);

	return {
		week: result.week,
		paper: result.paper,
		deepDiveComponent
	};
};

export function entries() {
	return weeks.flatMap((w) =>
		w.papers.map((p) => ({ slug: w.slug, paper: p.id }))
	);
}
