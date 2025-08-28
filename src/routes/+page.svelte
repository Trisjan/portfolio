<script>
import { Small_alifuru_logo, Big_alifuru_logo, About_logo, Alifuru_leafs, Photo_self, Alifuru_birds, ALifuru_lines, OBA_logo, OBA_MacBook, WOGO_logo, WOGO_mockup, Visual_thinking_logo, Visual_thinking_mockup } from '$lib/index.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from 'gsap/dist/SplitText';
import { onMount } from 'svelte';
let activeSection = '';

onMount(() => {
	gsap.registerPlugin(ScrollTrigger, SplitText);

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

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="Trisjan's portfolio" />
</svelte:head>

<section class="intro">
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
	<div class="work_middle">
		<div class="work_middle_carrousel">
			<div class="work_middle_carrousel_card" id="work1">
				<div class="work_middle_text">
					<article>
						<img src={OBA_logo} alt="logo">
						<h2>Openbare<br>bibliotheek van<br>Amsterdam</h2>
						<h3>Code project</h3>
					</article>
					<a href="https://mijn-oba.netlify.app/" target="_blank" rel="noopener noreferrer">View project</a>
				</div>
				<img src={OBA_MacBook} alt="OBA site in macbook mockup">
			</div>
			<div class="work_middle_carrousel_card" id="work2">
				<div class="work_middle_text">
					<article>
						<img src={WOGO_logo} alt="logo" loading="lazy">
						<h2>WOGO<br>cocktail<br>walks</h2>
						<h3>Code project</h3>
					</article>
					<a href="https://wogo.agency.fdnd.nl/" target="_blank" rel="noopener noreferrer">View project</a>
				</div>
				<img src={WOGO_mockup} alt="OBA site in macbook mockup" loading="lazy">
			</div>
			<div class="work_middle_carrousel_card" id="work3">
				<div class="work_middle_text">
					<article>
						<img src={Visual_thinking_logo} alt="logo" loading="lazy">
						<h2>Visual<br>Thinking<br>HBO</h2>
						<h3>Code project</h3>
					</article>
					<a href="https://visualthinking.dev.fdnd.nl/" target="_blank" rel="noopener noreferrer">View project</a>
				</div>
				<img src={Visual_thinking_mockup} alt="OBA site in macbook mockup" loading="lazy">
			</div>
		</div>
		<nav class="work_carrousel_buttons">
			<a href="#work1"></a>
			<a href="#work2"></a>
			<a href="#work3"></a>
		</nav>
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

		scroll-behavior: smooth; /* zorgt voor een vloeiende scrollbeweging */
		-ms-overflow-style: none; /* voor Internet Explorer en Edge */
		-webkit-overflow-scrolling: touch; /* voor iOS */

		&::-webkit-scrollbar {
			width: 10px;
			height: 10px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}
	}

	

	.work > .work_middle > .work_middle_carrousel > .work_middle_carrousel_card {
		scroll-snap-align: start; /* zorgt ervoor dat de cards netjes uitlijnen bij het scrollen */
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

	.work > .work_middle > .work_carrousel_buttons > a {
		height: 1.5rem;
		width: 1.5rem;
		background-color: grey;
		border-radius: 2rem;
		display: flex;
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
