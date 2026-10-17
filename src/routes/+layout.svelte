<script>
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import { Navigation } from '$lib/index.js';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { setLenis } from '$lib/smoothScroll.js';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	onMount(() => {
		// Geen smooth scroll voor mensen die minder beweging willen
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis({
			duration: 1.2,
			anchors: true, // menu-links (#about, #work) scrollen ook soepel
		});

		// Lenis laten meelopen met GSAP, zodat de ScrollTrigger-animaties synchroon blijven
		setLenis(lenis);
		lenis.on('scroll', ScrollTrigger.update);
		const update = (/** @type {number} */ time) => lenis.raf(time * 1000);
		gsap.ticker.add(update);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(update);
			lenis.destroy();
			setLenis(null);
		};
	});
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
		overflow-x: clip;
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

	/* Ruimte voor de vaste mobiele header */
	@media (max-width: 65rem) {
		main {
			padding-top: var(--header-height);
		}
	}
</style>
