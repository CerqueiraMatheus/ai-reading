import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md']
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			// Set base path for GitHub Pages: /<repo-name>
			// Leave empty for custom domains or user.github.io repos
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH ?? ''
		}
	}
};

export default config;
