import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const AD_CLIENT = 'ca-pub-2205226114982087';
const AD_SLOT = '5147855907';

describe('AdSense integration', () => {
	const appHtml = readFileSync(resolve('src/app.html'), 'utf-8');

	it('has the AdSense library script in <head>', () => {
		const headMatch = appHtml.match(/<head>([\s\S]*?)<\/head>/);
		expect(headMatch).not.toBeNull();
		const head = headMatch![1];
		expect(head).toContain(
			`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`
		);
		expect(head).toContain('async');
		expect(head).toContain('crossorigin="anonymous"');
	});

	it('has the <ins> ad unit in <body> with correct attributes', () => {
		const bodyMatch = appHtml.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/);
		expect(bodyMatch).not.toBeNull();
		const body = bodyMatch![1];
		expect(body).toContain('class="adsbygoogle"');
		expect(body).toContain(`data-ad-client="${AD_CLIENT}"`);
		expect(body).toContain(`data-ad-slot="${AD_SLOT}"`);
		expect(body).toContain('data-ad-format="auto"');
		expect(body).toContain('data-full-width-responsive="true"');
		expect(body).toContain('style="display:block"');
	});

	it('has the push script immediately after <ins>, inside <body>', () => {
		const bodyMatch = appHtml.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/);
		const body = bodyMatch![1];

		// The push script must appear after the <ins> element
		const insIndex = body.indexOf('class="adsbygoogle"');
		const pushIndex = body.indexOf('(adsbygoogle = window.adsbygoogle || []).push({})');
		expect(insIndex).toBeGreaterThan(-1);
		expect(pushIndex).toBeGreaterThan(-1);
		expect(pushIndex).toBeGreaterThan(insIndex);
	});

	it('has the push script inside a <script> tag (not onMount or other)', () => {
		const bodyMatch = appHtml.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/);
		const body = bodyMatch![1];

		// Extract the script block containing the push call
		const scriptMatch = body.match(
			/<script>\s*\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{}\);\s*<\/script>/
		);
		expect(scriptMatch).not.toBeNull();
	});

	it('has no AdSense code inside Svelte layout (must be static HTML)', () => {
		const layout = readFileSync(resolve('src/routes/+layout.svelte'), 'utf-8');
		expect(layout).not.toContain('adsbygoogle');
		expect(layout).not.toContain(AD_SLOT);
	});
});

describe('AdSense in build output', () => {
	it('build output contains the complete ad block', () => {
		const buildHtml = readFileSync(resolve('build/semana/semana-01.html'), 'utf-8');

		expect(buildHtml).toContain(
			`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`
		);
		expect(buildHtml).toContain(`data-ad-client="${AD_CLIENT}"`);
		expect(buildHtml).toContain(`data-ad-slot="${AD_SLOT}"`);
		expect(buildHtml).toContain('(adsbygoogle = window.adsbygoogle || []).push({})');
	});
});
