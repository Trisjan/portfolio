<script>
	import '../app.css';
	import { Navigation } from '$lib/index.js';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="app">
	<Navigation />

	<main>
		{@render children()}
	</main>

	<!-- <footer>
		<p>
			visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer> -->
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	footer a {
		font-weight: bold;
	}

	/* Gebruik :global nav zodat de blend-mode werkt op het Navigation component */
	:global(nav) {
		position: relative;
		z-index: 100;
		mix-blend-mode: difference;
		color: white !important;
		background: transparent !important;
	}

	/* Zorg dat de nav tekst altijd wit is boven zwart */
	:global(nav a), :global(nav ul), :global(nav li) {
		color: white !important;
	}

	/* Optioneel: forceer nav boven alles */
	:global(nav) {
		pointer-events: auto;
	}
</style>
