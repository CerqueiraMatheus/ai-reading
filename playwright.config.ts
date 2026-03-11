import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview -- --port 4173',
		port: 4173,
		reuseExistingServer: true
	},
	testDir: 'tests',
	testMatch: '*.e2e.ts',
	use: {
		baseURL: 'http://localhost:4173'
	}
});
