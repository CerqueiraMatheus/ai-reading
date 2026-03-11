<script lang="ts">
	import { progress } from '$lib/stores/progress';
	import { base } from '$app/paths';

	let { data } = $props();
	const week = $derived(data.week);
	const paper = $derived(data.paper);
	const DeepDive = $derived(data.deepDiveComponent);

	const completedPapers = $derived($progress.completedPapers);
	const isDone = $derived(progress.isPaperDone(completedPapers, week.slug, paper.id));

	const nextPaper = $derived(week.papers.find((p) => p.order === paper.order + 1));

	const pdfUrl = $derived(`https://arxiv.org/pdf/${paper.arxivId}`);
	const abstractUrl = $derived(`https://arxiv.org/abs/${paper.arxivId}`);
</script>

<a href="{base}/semana/{week.slug}" class="back-link">← Voltar para Semana {week.number}</a>

<div class="paper-page-header">
	<span class="week-number">Semana {week.number} · Artigo {paper.order}</span>
	<h1>{paper.title}</h1>
	<p class="authors">{paper.authors.join(', ')}</p>
	<div class="paper-nav">
		<a href={abstractUrl} target="_blank" rel="noopener">arXiv ↗</a>
		<a href={pdfUrl} target="_blank" rel="noopener">PDF direto ↗</a>
	</div>
</div>

<div class="pdf-container">
	<iframe src={pdfUrl} title="PDF: {paper.title}"></iframe>
</div>

{#if DeepDive}
	<div class="deep-dive">
		<h2>🔍 Mergulho Profundo</h2>
		<DeepDive />
	</div>
{/if}

<div class="paper-actions">
	{#if isDone}
		<button class="btn-done completed" disabled>✓ Leitura concluída</button>
	{:else}
		<button class="btn-done" onclick={() => progress.markPaperDone(week.slug, paper.id)}>
			Marcar como lido
		</button>
	{/if}

	{#if isDone && nextPaper}
		<a href="{base}/semana/{week.slug}/{nextPaper.id}" class="btn-next">
			Próximo artigo →
		</a>
	{:else if isDone && !nextPaper}
		<a href="{base}/" class="btn-next">
			Voltar às semanas →
		</a>
	{/if}
</div>
