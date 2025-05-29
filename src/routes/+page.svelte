<script>
import { Small_alifuru_logo, Big_alifuru_logo, About_logo, Alifuru_leafs, Photo_self, Alifuru_birds, ALifuru_lines, OBA_logo, OBA_MacBook } from '$lib/index.js';
</script>

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="Trisjan's portfolio" />
</svelte:head>

<section class="intro">
	<picture>
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
		<p>
			<span class="line">junior</span>
			<span class="line"> frontend</span>
			<span class="line"> developer /</span>
			<span class="line"> designer</span>
		</p>
	</div>
</section>

<section class="about">
	<div class="about_top">
		<section>
			<img src={About_logo} alt="">
			<h2>About me</h2>
		</section>
		<img src={Alifuru_leafs} alt="">
	</div>
	<article>
		<section class="about_text">
			<p>
				"Altijd nieuwsgierig en klaar voor nieuwe uitdagingen in mijn carrière, 
				ben ik opgewonden om mijn vaardigheden van tijdens mijn studie te gebruiken en echt iets te bereiken. 
				Ik ben enthousiast om mijn opgedane vaardigheden tijdens mijn studie in te zetten en een betekenisvolle bijdrage te leveren in mijn vakgebied. 
				Mijn doel is om niet alleen professioneel te groeien, maar ook om mijn kennis en expertise in te zetten voor het van anderen. 
				Ik ben vastbesloten om mijn potentieel te benutten en een verder te groeien."
			</p>
			<button>
				Contact
			</button>
		</section>
		<img src={Photo_self} alt="My self">
	</article>
</section>

<section class="work">
	<div class="work_top">
		<section>
			<img src={Alifuru_birds} alt="Alifuru birds">
			<h2>
				<span class="line">Selected</span>
				<span class="line">work</span>
			</h2>
		</section>
		<img src={ALifuru_lines} alt="Alifuru lines">
	</div>
	<div class="work_middle">
		<article>
			<img src={OBA_logo} alt="logo">
			<h2>Openbare<br>bibliotheek van<br>Amsterdam</h2>
			<h3>Code project</h3>
		</article>
		<a href="https://github.com/Trisjan/oba" target="_blank" rel="noopener noreferrer">View project</a>
	</div>
	<img src={OBA_MacBook} alt="OBA site in macbook mockup">
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
		padding: 2rem 0;
	}

	.intro {
		text-transform: uppercase;
		text-align: center;
	}

	.intro > .intro_text > h1 {
		margin-bottom: 0;
	}

	.intro > .intro_text > p {
		font-weight: lighter;
		margin-top: 0;
	}

	.intro > .intro_text > p > .line {
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

	.about > article > .about_text > button {
		border: none;
		background: none;
		color: var(--color-text-2);
		text-transform: uppercase;
		text-decoration: underline;
		margin: 2.5rem 0;
		font-size: 1.2rem;
		font-weight: 500;
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
		display: flex;
		justify-content: space-between;
		width: 80%; /* changed from 80vw to 80% */
		margin: 2rem 0;
	}

	.work > .work_middle > article {
		justify-content: flex-start;
		/* max-width: 50vw; */
	}

	.work > .work_middle > article > h2, h3 {
		margin: 0;
		text-transform: uppercase;
	}

	.work > .work_middle > article > h3 {
		font-weight: 300;
	}

	.work > .work_middle > a {
		align-self: self-end;
		text-transform: uppercase;
		color: var(--color-text-1);
		font-weight: 500;
	}

	.work > img {
		width: 80%; /* changed from 80vw to 80% */
		object-fit: contain;
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

		.intro > .intro_text > p {
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

		.about > article > .about_text > button {
			margin-bottom: 0;
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

		.work > .work_middle {
			margin: 0;
			padding-top: 3em;
			padding-bottom: 2em;
		}
		.work > img {
			margin-bottom: 3em;
			aspect-ratio: 16 / 9;
			object-fit: cover;
		}
	}

	@media (min-width: 65em) {
		.intro > .intro_text > p {
			text-align: right;
			font-weight: 300;
		}
		.intro > .intro_text > p > .line {
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

		.about > article > .about_text > button {
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
	}
</style>
