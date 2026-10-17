<script>
import { Small_alifuru_logo, Big_alifuru_logo, About_logo, Alifuru_leafs, Photo_self, Alifuru_birds, ALifuru_lines, OBA_logo, OBA_MacBook, WOGO_logo, WOGO_mockup, Visual_thinking_logo, Visual_thinking_mockup } from '$lib/index.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from 'gsap/dist/SplitText';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { onMount } from 'svelte';
let activeSection = $state('');

const projects = [
	{
		title: ['Openbare', 'bibliotheek van', 'Amsterdam'],
		type: 'Code project',
		url: 'https://mijn-oba.netlify.app/',
		logo: OBA_logo,
		mockup: OBA_MacBook,
		mockupAlt: 'OBA site in macbook mockup',
	},
	{
		title: ['WOGO', 'cocktail', 'walks'],
		type: 'Code project',
		url: 'https://wogo.agency.fdnd.nl/',
		logo: WOGO_logo,
		mockup: WOGO_mockup,
		mockupAlt: 'WOGO site mockup',
	},
	{
		title: ['Visual', 'Thinking', 'HBO'],
		type: 'Code project',
		url: 'https://visualthinking.dev.fdnd.nl/',
		logo: Visual_thinking_logo,
		mockup: Visual_thinking_mockup,
		mockupAlt: 'Visual Thinking site mockup',
	},
];

// Carrousel
let activeIndex = $state(0);
/** @type {HTMLDivElement} */
let track;
/** @type {HTMLDivElement[]} */
let cards = [];
let isProgrammaticScroll = false;
let scrollFrame = 0;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Afstand van een card tot het begin van de carrousel
/** @param {number} index */
const cardOffset = (index) => cards[index].offsetLeft - cards[0].offsetLeft;

/**
 * @param {number} index
 * @param {number} direction 1 = vooruit, -1 = terug
 */
function animateCardIn(index, direction) {
	if (prefersReducedMotion()) return;

	const card = cards[index];
	const image = card.querySelector(':scope > img');
	const logo = card.querySelector('.work_middle_text > article > img');
	const textItems = card.querySelectorAll('.work_middle_text > article > :not(img), .work_middle_text > a');

	// Tekst wordt horizontaal onthuld, mee in de richting waarin je door de carrousel gaat
	const hiddenText = direction > 0 ? 'inset(-20% 100% -20% -5%)' : 'inset(-20% -5% -20% 100%)';

	gsap.killTweensOf([image, logo, ...textItems]);
	gsap.timeline()
		.fromTo(image, {
			clipPath: direction > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
			scale: 1.05,
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			scale: 1,
			duration: 0.9,
			ease: 'power3.out',
			clearProps: 'clipPath,transform',
		})
		.fromTo(logo, {
			autoAlpha: 0,
			scale: 0.6,
			rotate: -15 * direction,
		}, {
			autoAlpha: 1,
			scale: 1,
			rotate: 0,
			duration: 0.7,
			ease: 'back.out(1.7)',
			clearProps: 'opacity,visibility,transform',
		}, '<0.1')
		.fromTo(textItems, {
			clipPath: hiddenText,
			x: 20 * direction,
		}, {
			clipPath: 'inset(-20% -5% -20% -5%)',
			x: 0,
			duration: 0.8,
			stagger: 0.08,
			ease: 'expo.out',
			clearProps: 'clipPath,transform',
		}, '<0.1');
}

/** @param {number} index */
function setActive(index) {
	if (index === activeIndex) return;
	const direction = index > activeIndex ? 1 : -1;
	activeIndex = index;
	animateCardIn(index, direction);
}

/** @param {number} index */
function goTo(index) {
	index = (index + projects.length) % projects.length;
	if (index === activeIndex) return;
	setActive(index);

	if (prefersReducedMotion()) {
		track.scrollLeft = cardOffset(index);
		return;
	}

	// Scroll-snap tijdelijk uit, anders vecht de browser tegen de animatie
	isProgrammaticScroll = true;
	track.style.scrollSnapType = 'none';
	gsap.to(track, {
		scrollTo: { x: cardOffset(index), autoKill: false },
		duration: 0.9,
		ease: 'power3.inOut',
		overwrite: true,
		onComplete: () => {
			track.style.scrollSnapType = '';
			isProgrammaticScroll = false;
		},
	});
}

// Houdt de bolletjes bij wanneer er geswiped/gescrold wordt
function handleTrackScroll() {
	if (isProgrammaticScroll) return;
	cancelAnimationFrame(scrollFrame);
	scrollFrame = requestAnimationFrame(() => {
		const step = cardOffset(1) || track.clientWidth;
		const index = Math.min(projects.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
		setActive(index);
	});
}

// Pijltjestoetsen werken zodra de focus in de carrousel staat
/** @param {KeyboardEvent} event */
function handleCarouselKeydown(event) {
	if (!track?.parentElement?.contains(document.activeElement)) return;
	if (event.key === 'ArrowRight') {
		event.preventDefault();
		goTo(activeIndex + 1);
	} else if (event.key === 'ArrowLeft') {
		event.preventDefault();
		goTo(activeIndex - 1);
	}
}

// Bij een andere schermgrootte de actieve card weer netjes uitlijnen
function handleResize() {
	if (track && !isProgrammaticScroll) track.scrollLeft = cardOffset(activeIndex);
}

onMount(() => {
	gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

	let tl = gsap.timeline();
	let splitName = SplitText.create('.intro_text h1', {
		type: 'chars',
	});
	let splitFunction = SplitText.create('.intro_text h4', {
		type: 'chars',
	});
	let splitAboutTitle = SplitText.create('.about_top > section > h2', {
		type: 'chars',
	});
	let splitAboutText = SplitText.create('.about_text > p', {
		type: 'words',
	});
	let splitWorkTitle = SplitText.create('.work_top > section > h2', {
		type: 'chars',
	});

	tl.from('.intro_picture', {
		duration: 2,
		opacity: 0,
		x: 1500,
		rotate: 360,
		ease: 'power2.out',
	})
	tl.from(splitName.chars, {
		duration: 0.5,
		opacity: 0,
		y: 50,
		stagger: {
			amount: 0.6
		},
		ease: 'power2.out',
	}, '<=0.5');
	tl.from(splitFunction.chars, {
		duration: 0.5,
		opacity: 0,
		y: 50,
		stagger: {
			amount: 0.6
		},
		ease: 'power2.out',
	}, '-=0.5');
	
	gsap.from('.about_top > img', {
		duration: 1,
		x: 1500,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: '.about_top',
			start: 'top 90%',
		}
	});

	gsap.from('.about_top > section > img', {
		duration: 1,
		x: -1500,
		rotate: -360,
		delay: 0.4,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: '.about_top',
			start: 'top 90%',
		}
	});

	gsap.from(splitAboutTitle.chars, {
		duration: 0.5,
		opacity: 0,
		y: -50,
		delay: 0.2,
		ease: 'power2.out',
		stagger: {
			amount: 0.6
		},
		scrollTrigger: {
			trigger: '.about_top',
			start: 'top 90%',
		}
	});

	gsap.from('.about > article > img', {
		duration: 1,
		opacity: 0,
		x: -50,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: '.about_text',
			start: '80% 90%',
		}
	});

	gsap.from(splitAboutText.words, {
		duration: 0.5,
		opacity: 0,
		y: 50,
		ease: 'power2.out',
		stagger: {
			amount: 0.6,
		},
		scrollTrigger: {
			trigger: '.about_text',
			start: 'top 90%',
		}
	});

	gsap.from('.about_contact', {
		duration: 1,
		opacity: 0,
		x: 50,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: '.about_contact',
			start: 'top 90%',
		}
	})

	gsap.from(splitWorkTitle.chars, {
		duration: 0.5,
		opacity: 0,
		delay: 0.2,
		y: -50,
		ease: 'power2.out',
		stagger: {
			amount: 0.6,
			from: 'random'
		},
		scrollTrigger: {
			trigger: '.work_top',
			start: 'top 90%',
		}
	});

	gsap.from('.work_top > img', {
		duration: 1,
		x: -1500,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: '.work_top',
			start: 'top 90%',
		}
	});

	gsap.from('.work_top > section > img', {
		duration: 1,
		x: 1500,
		rotate: -360,
		ease: 'power2.out',
		delay: 0.4,
		scrollTrigger: {
			trigger: '.work_top',
			start: 'top 90%',
		}
	});

	gsap.from('.work_middle_carrousel_card', {
		duration: 1,
		x: '-10%',
		ease: 'power2.in',
		scrollTrigger: {
			trigger: '.work_middle',
			start: 'top 90%',
		}
	});

    // IDs van de secties die je wilt observeren
    const sectionIds = ['about', 'work'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% in beeld
    };
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection = entry.target.id;
            }
        });
    }, options);
    sections.forEach(section => {
        if (section) observer.observe(section);
    });
    return () => observer.disconnect();
});
</script>

<svelte:window onresize={handleResize} onkeydown={handleCarouselKeydown} />

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="Trisjan's portfolio" />
</svelte:head>

<section class="intro" id="home">
	<picture class="intro_picture">
		<source srcset={Small_alifuru_logo} media="(max-width: 649px)" />
		<source srcset={Big_alifuru_logo} media="(min-width: 650px)" />
		<img 
			src={Small_alifuru_logo}
			alt="Alifuru logo"
		/>
	</picture>
	<div class="intro_text">
		<h1>
			<span class="line">Trisjan</span>
			<span class="line">Mustamu</span>
		</h1>
		<h4>
			<span class="line">junior</span>
			<span class="line"> frontend</span>
			<span class="line"> developer &</span>
			<span class="line"> designer</span>
		</h4>
	</div>
</section>

<section class="about" id="about">
	<div class="about_top">
		<section>
			<img src={About_logo} alt="About logo" loading="lazy">
			<h2>About me</h2>
		</section>
		<img src={Alifuru_leafs} alt="Alifuru leafs" loading="lazy">
	</div>
	<article>
		<section class="about_text">
			<p>
				"Altijd nieuwsgierig en klaar voor nieuwe uitdagingen in mijn carrière. 
				Ik ben opgewonden om mijn vaardigheden van tijdens mijn studie te gebruiken en echt iets te bereiken. 
				Enthousiast ben ik om mijn opgedane vaardigheden tijdens mijn studie in te zetten en een betekenisvolle bijdrage te leveren in mijn vakgebied. 
				Mijn doel is om niet alleen professioneel te groeien, maar ook om mijn kennis en expertise in te zetten voor anderen. 
				Ik ben vastbesloten om mijn potentieel te benutten en verder te groeien."
			</p>
			<section class="about_contact">
				<p>
					Contact
				</p>
				<a href="mailto:TrisjanM@gmail.com">TrisjanM@gmail.com</a>
			</section>
		</section>
		<img src={Photo_self} alt="My self" loading="lazy">
	</article>
</section>

<section class="work" id="work">
	<div class="work_top">
		<section>
			<img src={Alifuru_birds} alt="Alifuru birds" loading="lazy">
			<h2>
				<span class="line">Selected</span>
				<span class="line">work</span>
			</h2>
		</section>
		<img src={ALifuru_lines} alt="Alifuru lines" loading="lazy">
	</div>
	<div
		class="work_middle"
		role="region"
		aria-roledescription="carrousel"
		aria-label="Selected work"
	>
		<div class="work_middle_carrousel" bind:this={track} onscroll={handleTrackScroll}>
			{#each projects as project, i}
				<div
					class="work_middle_carrousel_card"
					id="work{i + 1}"
					bind:this={cards[i]}
					role="group"
					aria-roledescription="slide"
					aria-label="{i + 1} van {projects.length}: {project.title.join(' ')}"
				>
					<div class="work_middle_text">
						<article>
							<img src={project.logo} alt="{project.title.join(' ')} logo" loading={i === 0 ? 'eager' : 'lazy'}>
							<h2>{#each project.title as line, j}{line}{#if j < project.title.length - 1}<br>{/if}{/each}</h2>
							<h3>{project.type}</h3>
						</article>
						<a href={project.url} target="_blank" rel="noopener noreferrer" tabindex={i === activeIndex ? 0 : -1}>View project</a>
					</div>
					<img src={project.mockup} alt={project.mockupAlt} loading={i === 0 ? 'eager' : 'lazy'}>
				</div>
			{/each}
		</div>
		<div class="work_carrousel_buttons">
			{#each projects as project, i}
				<button
					type="button"
					class:active={i === activeIndex}
					aria-label="Ga naar project {i + 1}: {project.title.join(' ')}"
					aria-current={i === activeIndex ? 'true' : undefined}
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		font-size: 4rem;
		font-weight: 500;
	}

	.line {
		display: block;
	}

	.intro,
	.about,
	.work {
		min-height: 100vh;
		width: 100%; /* changed from 100vw to 100% */
		padding: 1rem 0;
	}

	.intro {
		text-transform: uppercase;
		text-align: center;
	}

	.intro > .intro_text > h1 {
		margin-bottom: 0;
	}

	.intro > .intro_text > h4 {
		font-weight: lighter;
		margin-top: 0;
	}

	.intro > .intro_text > h4 > .line {
		display: inline;
	}

	.about {
		background-color: var(--color-bg-1);
		color: var(--color-text-2);
		display: flex;
		flex-direction: column;
	}

	.about > .about_top {
		flex-shrink: 0; /* Zorgt dat dit gedeelte niet verkleint */
		padding: 1rem 0;
	}

	.about > .about_top h2 {
		font-size: 4rem;
		font-weight: 400;
		text-transform: uppercase;
		margin: 1.5rem 0;
	}

	.about > .about_top > section > img {
		height: 3.125rem;
	}

	.about > .about_top > img {
		max-width: 100%; /* changed from 100vw to 100% */
		height: 1.5rem;
		object-fit: cover;
	}

	.about > article {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; /* Verticaal en horizontaal centreren */
		text-align: center;
		width: 80%; /* changed from 80vw to 80% */
		padding: 3rem 0;
	}

	.about > article > .about_text > p {
		margin: 0;
		font-weight: 300;
		font-style: italic;
	}

	.about > article > .about_text > .about_contact {
		border: none;
		background: none;
		color: var(--color-text-2);
		margin: 2.5rem 0;
		font-size: 1.2rem;
		font-weight: 500;
	}

	.about > article > .about_text > .about_contact > p {
		color: var(--color-text-2);
		margin-bottom: 0.4rem;
		font-size: 1.15rem;
	}
	

	.about > article > .about_text > .about_contact > a {
		color: var(--color-text-2);
		text-decoration: underline;
		font-size: 1.1rem;
		font-weight: 300;
		transition: color 0.3s ease;
			&:hover {
				color: #ff0000;
			}
	}

	.about > article > img {
		width: 90%; 
	}

	.work {
		display: flex;
		flex-direction: column;
	}

	.work > .work_top {
		padding: 1rem 0;
	}

	.work > .work_top h2 {
		font-size: 4rem;
		font-weight: 400;
		text-transform: uppercase;
		margin: 1.5rem 0;
		text-align: center;
	}

	.work > .work_top > img {
		max-width: 100%; /* changed from 100vw to 100% */
		height: 1.5rem;
		object-fit: cover;
	}

	.work > .work_middle {
		overflow: hidden;
	}

	.work > .work_middle > .work_middle_carrousel {
		display: flex;
		flex-direction: row;
		padding-top: 3rem;
		width: 80vw;

		overflow-x: auto;
		scroll-snap-type: x mandatory; /* zorgt voor een 'snapping' effect bij scrollen */

		overscroll-behavior-x: contain; /* voorkomt 'terug'-swipe in de browser */
		-webkit-overflow-scrolling: touch; /* voor iOS */

		/* De bolletjes laten zien waar je bent, dus de scrollbar mag weg */
		scrollbar-width: none;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card {
		scroll-snap-align: start; /* zorgt ervoor dat de cards netjes uitlijnen bij het scrollen */
		scroll-snap-stop: always; /* één project per swipe, ook bij een snelle swipe */
		flex-shrink: 0;
		width: 100%;
		margin-right: 2rem; /* ruimte tussen de cards */

		&:last-child {
			margin-right: 0rem; /* ruimte tussen de cards */
		}
	}

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article {
		justify-content: flex-start;
		/* max-width: 50vw; */
	}

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article > img {
		height: 5rem;
		width: auto;
		object-fit: contain;
		margin-bottom: 0.5rem;
	}

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article > h2, h3 {
		margin: 0;
		text-transform: uppercase;
	}

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article > h3 {
		font-weight: 300;
	}

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > a {
		align-self: self-end;
		text-transform: uppercase;
		color: var(--color-text-1);
		font-weight: 500;
	}

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > img {
		width: 100%; /* changed from 80vw to 80% */
		height: 30vh;
		object-fit: cover;
		display: block;
	}

	.work > .work_middle > .work_carrousel_buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.work > .work_middle > .work_carrousel_buttons > button {
		height: 1.5rem;
		width: 1.5rem;
		padding: 0;
		border: none;
		border-radius: 2rem;
		background-color: #d3d3d3;
		cursor: pointer;
		transition: background-color 0.4s ease, transform 0.4s ease;

		&:hover {
			background-color: #a9a9a9;
		}

		&:focus-visible {
			outline: 2px solid #333;
			outline-offset: 3px;
		}

		&.active {
			background-color: #333;
			transform: scale(1.15);
			cursor: default;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.work > .work_middle > .work_carrousel_buttons > button {
			transition: none;
		}
	}

	/* Mobiel: elke sectie is precies één scherm hoog (svh = zonder adresbalk-sprong) */
	@media (max-width: 40.6249em) {
		.intro,
		.about,
		.work {
			box-sizing: border-box;
			flex: none; /* anders wint de algemene 'section { flex: 0.6 }' van de hoogte */
			min-height: 0;
			height: 100vh;
			height: 100svh;
			overflow: hidden;
		}

		.intro {
			height: calc(100vh - var(--header-height));
			height: calc(100svh - var(--header-height));
		}

		.intro > .intro_picture img {
			max-height: 45svh;
			max-width: 80vw;
		}

		/* About */
		.about {
			justify-content: flex-start;
			padding: 1.5rem 0;
		}

		.about > .about_top {
			padding: 0;
		}

		.about > .about_top h2 {
			font-size: 2.75rem;
			margin: 0.5rem 0 0.75rem;
		}

		.about > .about_top > section > img {
			height: 2.5rem;
		}

		.about > article {
			flex: 1;
			min-height: 0;
			justify-content: flex-start;
			gap: 1.25rem;
			padding: 1.25rem 0 0;
		}

		.about > article > .about_text {
			flex: none;
		}

		.about > article > .about_text > p {
			font-size: 0.875rem;
			line-height: 1.45;
		}

		.about > article > .about_text > .about_contact {
			flex: none;
			margin: 1rem 0 0;
		}

		.about > article > img {
			flex: 1 1 0;
			min-height: 0;
			width: 100%;
			object-fit: cover;
		}

		/* Selected work */
		.work {
			justify-content: flex-start;
			padding: 1.5rem 0;
		}

		.work > .work_top {
			flex: none;
			padding: 0;
		}

		.work > .work_top > section > img {
			height: 2.5rem;
		}

		.work > .work_top h2 {
			font-size: 2.5rem;
			margin: 0.5rem 0 0.75rem;
		}

		.work > .work_top > section > h2 > .line {
			display: inline;
		}

		.work > .work_middle {
			flex: 1;
			min-height: 0;
			display: flex;
			flex-direction: column;
		}

		.work > .work_middle > .work_middle_carrousel {
			flex: 1;
			min-height: 0;
			padding-top: 1.5rem;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card {
			display: flex;
			flex-direction: column;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text {
			gap: 1rem;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > a {
			white-space: nowrap;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article > img {
			height: 3.5rem;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > img {
			flex: 1 1 0;
			min-height: 0;
			height: auto;
		}

		.work > .work_middle > .work_carrousel_buttons {
			flex: none;
			margin-top: 1rem;
		}
	}

	@media (min-width: 40.625em) {
		.intro,
		.about,
		.work {
			padding: 0;
		}

		.intro {
			position: relative;
			align-items: flex-start;
			padding: 0;
			width: 100%;     /* changed from 100vw to 100% */
			height: 100vh;    /* of een vaste hoogte, afhankelijk van je layout */
			overflow: hidden; /* voorkomt dat de helft van de afbeelding buiten beeld springt */
		} 

		.intro > picture {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateX(50%) translateY(-50%);
		}

		.intro > .intro_text {
			text-align: start;
			padding-left: 6%;
		}

		.intro > .intro_text > h1 {
			font-size: clamp(1.8em, 7vw + 1rem, 9em);
			line-height: 1em;
		}

		.intro > .intro_text > h4 {
			font-size: clamp(1em, 1vw + 0.6em, 2em);
		}

		.intro > .intro_text > h1, p {
			margin: 0;
		}
		
		.about {
			padding-bottom: 2em;
		}

		.about > .about_top > section {
			flex-direction: row;
			justify-content: space-between;
			padding: 0 6%;
		}

		.about > .about_top > img {
			height: 2rem;
		}

		.about > article {
			flex-direction: column-reverse;
			align-items: start;
			width: 80%;
		}

		.about > article > .about_text {
			align-items: end;
			padding-top: 2rem;
		}

		.about > article > .about_text > p {
			text-align: right;
			width: 60%;
		}

		.about > article > .about_text > .about_contact {
			margin-bottom: 0;
			display: flex;
			align-items: end;
		}

		.about > article > .about_text > .about_contact > p {
			font-weight: 500;
			padding-bottom: 0.5rem;
			font-size: 1.25em;
		}

		.about > article > .about_text > .about_contact > a {
			font-size: 1.2rem;
			font-weight: 300;
		}

		.about > article > img {
			aspect-ratio: 5 / 4;
			height: auto;
			width: 45vw;
			object-fit: cover;
		}

		.work > .work_top > section {
			flex-direction: row-reverse;
			justify-content: space-between;
			padding: 0 6%;
		}

		.work > .work_top > section > h2 > .line {
			display: inline;
		}

		.work > .work_top > img {
			height: 2em;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text {
			margin: 0;
			padding-bottom: 2em;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > a {
			transition: color 0.3s ease;

			&:hover {
				color: #ff0000;
			}
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > img {
			aspect-ratio: 6 / 4;
			object-fit: cover;
			height: auto;
		}
	}

	@media (min-width: 65em) {
		.intro > .intro_text > h4 {
			text-align: right;
			font-weight: 300;
		}
		.intro > .intro_text > h4 > .line {
			display: block;
		}

		.intro > picture {
			height: 70%;
			width: auto;
			max-height: 70vh;
		}
		.intro > picture > img {
			height: 100%;
			width: auto;
			object-fit: contain;
		}

		.about,
		.work {
			flex-direction: column-reverse;
		}

		.about > .about_top,
		.work > .work_top {
			display: flex;
			flex-direction: column-reverse;
		}

		.about > .about_top > section > img {
			height: 100%;
		}

		.about > .about_top > section > h2 {
			font-size: clamp(6rem, 0.6667rem + 8.2051vw, 8rem);
			margin: 0;
		}

		.about > .about_top > img,
		.work > .work_top > img {
			width: 100vw;
			height: auto;
			min-height: 3em;
			object-fit: block;
			padding-bottom: 1em;
		}

		.about > article {
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
			width: 88%;
		}

		.about > article > .about_text {
			padding: 0;
		}

		.about > article > .about_text > p {
			font-weight: 300;
			font-size: 1.2em;
			width: 90%;
		}

		.about > article > .about_text > .about_contact {
			margin: 0;
			padding-top: 2em;
			font-size: 1.3em;
			font-weight: 500;
		}

		.about > article > img {
			aspect-ratio: 1 / 1	;
			height: 50vh;
			width: auto;
		}

		.work > .work_top > section > img {
			height: 100%;
			object-fit: fill;
		}

		.work > .work_top > section > h2 {
			font-size: clamp(5rem, 0.6667rem + 8.2051vw, 8rem);
			margin: 0;
		}

		.work > .work_middle {
			align-items: stretch; /* was center, nu stretch zodat children de volledige hoogte pakken */
		}

		.work > .work_middle > .work_middle_carrousel {
			width: 88vw; /* changed from 80vw to 100% */
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card {
			flex-direction: row-reverse;
			justify-content: space-between;
			display: flex;
			padding-top: 2rem;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text {
			flex-direction: column;
			align-self: stretch; /* zorgt dat de child de volledige hoogte van de parent pakt */
			text-align: right;
			padding: 0;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article > img {
			height: 12rem;
			width: auto;
		}
			.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article > img {
		height: 6rem;
		width: auto;
		object-fit: contain;
		margin-bottom: 0.5rem;
	}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > article > h2 {
			font-size: 2.5rem;
			margin-bottom: 0.5rem;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > .work_middle_text > a {
			font-size: 1.3rem;
		}

		.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card > img {
			aspect-ratio: 3 / 2;
			width: 60%;
			height: 60vh;
			object-fit: cover;
		}

		.work > .work_middle > .work_carrousel_buttons {
			margin-bottom: 1rem;
		}
	}
</style>
