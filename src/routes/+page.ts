import { redirect } from '@sveltejs/kit';
import { getCurrentWeek } from '$lib/content';
import { base } from '$app/paths';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const current = getCurrentWeek();
	redirect(302, `${base}/semana/${current.slug}`);
};
