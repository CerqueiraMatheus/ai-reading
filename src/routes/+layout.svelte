<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { weeks } from '$lib/content';
	import { progress } from '$lib/stores/progress';
	import { page } from '$app/stores';

	let { children } = $props();
	let menuOpen = $state(false);
	let searchQuery = $state('');
	let searchInput = $state<HTMLInputElement | null>(null);

	const completedPapers = $derived($progress.completedPapers);
	const currentPath = $derived($page.url.pathname);

	const filteredWeeks = $derived(
		searchQuery.trim() === ''
			? weeks
			: weeks.filter((w) => {
					const query = searchQuery.toLowerCase();
					return (
						w.title.toLowerCase().includes(query) ||
						w.description.toLowerCase().includes(query) ||
						`semana ${w.number}`.includes(query) ||
						`s${w.number}`.includes(query)
					);
				})
	);

	function openMenu(): void {
		menuOpen = true;
		searchQuery = '';
		// Focus the search input after the DOM updates
		requestAnimationFrame(() => {
			searchInput?.focus();
		});
	}

	function closeMenu(): void {
		menuOpen = false;
		searchQuery = '';
	}
</script>

<svelte:head>
	<title>AI Reading</title>
	<meta name="description" content="Leituras semanais de artigos de IA com mergulhos profundos em português." />
</svelte:head>

<header>
	<div class="container header-inner">
		<h1 class="logo"><a href="{base}/">📄 AI Reading</a></h1>
		<div class="nav-area">
			<button class="menu-toggle" onclick={menuOpen ? closeMenu : openMenu} aria-label="Menu de semanas">
				<span class="menu-icon">{menuOpen ? '✕' : '☰'}</span>
				<span class="menu-label">Semanas</span>
			</button>
			{#if menuOpen}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="menu-backdrop" onclick={closeMenu}></div>
				<nav class="week-menu">
					<div class="menu-search">
						<input
							bind:this={searchInput}
							bind:value={searchQuery}
							type="text"
							placeholder="Buscar semana..."
							class="menu-search-input"
						/>
					</div>
					<div class="menu-list">
						{#each filteredWeeks as week (week.slug)}
							{@const unlocked = progress.isWeekUnlocked(completedPapers, weeks.indexOf(week), weeks)}
							{@const done = progress.isWeekDone(completedPapers, week.slug, week.papers)}
							{@const isCurrent = currentPath.includes(week.slug)}
							{#if unlocked}
								<a
									href="{base}/semana/{week.slug}"
									class="menu-item"
									class:active={isCurrent}
									onclick={closeMenu}
								>
									<span class="menu-week-num">S{week.number}</span>
									<span class="menu-week-title">{week.title}</span>
									{#if done}
										<span class="menu-badge done">✓</span>
									{/if}
								</a>
							{:else}
								<span class="menu-item locked">
									<span class="menu-week-num">S{week.number}</span>
									<span class="menu-week-title">{week.title}</span>
									<span class="menu-badge">🔒</span>
								</span>
							{/if}
						{:else}
							<span class="menu-empty">Nenhuma semana encontrada</span>
						{/each}
					</div>
				</nav>
			{/if}
		</div>
	</div>
</header>

<main class="container">
	{@render children()}
</main>
