<script lang="ts">
	import { progress } from '$lib/stores/progress';
	import { base } from '$app/paths';

	let { data } = $props();
	const week = $derived(data.week);

	const completedPapers = $derived($progress.completedPapers);
</script>

<div class="page-intro">
	<span class="week-number">Semana {week.number}</span>
	<h1>{week.title}</h1>
	<p>{week.description}</p>
</div>

<div class="paper-list">
	{#each week.papers as paper}
		{@const done = progress.isPaperDone(completedPapers, week.slug, paper.id)}
		{@const unlocked = progress.isPaperUnlocked(completedPapers, week.slug, paper.id, week.papers)}

		{#if unlocked}
			<a href="{base}/semana/{week.slug}/{paper.id}" class="paper-item" class:done>
				<span class="paper-order" class:done class:current={unlocked && !done}>
					{#if done}✓{:else}{paper.order}{/if}
				</span>
				<div class="paper-info">
					<h3 class="paper-title">{paper.title}</h3>
					<p class="paper-authors">{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ' et al.' : ''}</p>
				</div>
			</a>
		{:else}
			<div class="paper-item locked">
				<span class="paper-order locked">🔒</span>
				<div class="paper-info">
					<h3 class="paper-title">{paper.title}</h3>
					<p class="paper-authors">{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ' et al.' : ''}</p>
				</div>
			</div>
		{/if}
	{/each}
</div>
