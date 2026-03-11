import { test, expect } from '@playwright/test';

test.describe('AdSense loads and responds', () => {
	test('adsbygoogle.js script loads successfully from Google', async ({ page }) => {
		const adScriptResponse = page.waitForResponse(
			(resp) => resp.url().includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'),
			{ timeout: 15000 }
		);

		await page.goto('/semana/semana-01');

		const response = await adScriptResponse;
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('javascript');
	});

	test('AdSense processes the ad slot (sets data-adsbygoogle-status)', async ({ page }) => {
		await page.goto('/semana/semana-01');

		// Our ad <ins> has a specific data-ad-slot — use it to target ours
		const ins = page.locator('ins.adsbygoogle[data-ad-slot="5147855907"]');
		await expect(ins).toHaveCount(1);

		// AdSense sets data-adsbygoogle-status on processed <ins> elements.
		// Wait for it — this proves Google actually processed our request.
		await expect(ins).toHaveAttribute('data-adsbygoogle-status', /.+/, { timeout: 15000 });

		const status = await ins.getAttribute('data-adsbygoogle-status');
		// "done" = ad served or fallback rendered
		// "unfilled" = no ad available for this slot/domain
		// Both mean AdSense received and processed the request successfully.
		expect(status).toBeTruthy();
	});

	test('AdSense creates an iframe or marks the slot', async ({ page }) => {
		await page.goto('/semana/semana-01');

		const ins = page.locator('ins.adsbygoogle[data-ad-slot="5147855907"]');
		await expect(ins).toHaveAttribute('data-adsbygoogle-status', /.+/, { timeout: 15000 });

		// After processing, AdSense either:
		// 1. Injects an iframe inside the <ins> (ad served), or
		// 2. Leaves it empty with status "unfilled" (no ad for this domain/slot)
		const status = await ins.getAttribute('data-adsbygoogle-status');
		const hasIframe = await ins.locator('iframe').count();

		if (status === 'done') {
			expect(hasIframe).toBeGreaterThan(0);
		} else {
			// unfilled is expected on localhost / unapproved domains
			expect(status).toBe('unfilled');
		}
	});
});
