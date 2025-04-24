<script>
import { onMount } from "svelte";
import { Mobile_logo, About_logo, Alifuru_leafs, Photo_self, Alifuru_birds, ALifuru_lines } from '$lib/index.js';

const GithubAPI = 'https://api.github.com/users/';
const Username = 'Trisjan';
const RepoAPI = '/repos';
const ApiUrl = `${GithubAPI}${Username}${RepoAPI}`

let repos = [];

onMount(async () => {
	try {
            const response = await fetch(ApiUrl);
            repos = await response.json();
            
            repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } catch (error) {
            console.error('Error fetching repos:', error);
        }
})

</script>

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="Trisjan's portfolio" />
</svelte:head>

<section class="intro">
	<img height="250" width="250" src={Mobile_logo} alt="Alifuru logo">
	<div class="intro_text">
		<h1>Trisjan Mustamu</h1>
		<p>junior frontend developer / designer</p>
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
		<p>
			Altijd nieuwsgierig en klaar voor nieuwe uitdagingen in mijn carrière, 
			ben ik opgewonden om mijn vaardigheden van tijdens mijn studie te gebruiken en echt iets te bereiken. 
			Ik ben enthousiast om mijn opgedane vaardigheden tijdens mijn studie in te zetten en een betekenisvolle bijdrage te leveren in mijn vakgebied. 
			Mijn doel is om niet alleen professioneel te groeien, maar ook om mijn kennis en expertise in te zetten voor het van anderen. 
			Ik ben vastbesloten om mijn potentieel te benutten en een verder te groeien.
		</p>
		<button>
			Contact
		</button>
		<img src={Photo_self} alt="My self">
	</article>
</section>

<section class="work">
	<div class="work_top">
		<section>
			<img src={Alifuru_birds} alt="Alifuru birds">
			<h2>Selected work</h2>
		</section>
		<img src={ALifuru_lines} alt="Alifuru lines">
	</div>
	<div class="work_middle">
		<section>
			<img src="" alt="logo">
			<h2>Openbare bibliotheek van Amsterdam</h2>
			<h3>Code project</h3>
		</section>
		<a href="">View project</a>
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

	.intro,
	.about {
		min-height: 100vh;
		width: 100vw;
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
		max-width: 100vw;
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
		padding: 1rem;
	}

	.about > article > p {
		text-align: center;
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
		max-width: 100vw;
		height: 1.5rem;
		object-fit: cover;
	}
</style>
