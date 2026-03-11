<script lang="ts">
	// This page should never render — +page.ts redirects to current week.
	// Fallback just in case:
	import { getCurrentWeek } from '$lib/content';
	import { base } from '$app/paths';

	const current = getCurrentWeek();
</script>

<p>Redirecionando para <a href="{base}/semana/{current.slug}">Semana {current.number}</a>...</p>
