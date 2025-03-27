<script>
import { onMount } from "svelte";
import { Mobile_logo } from '$lib/index.js';

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
		<img src="" alt="">
		<h2>About me</h2>
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
		<img src="" alt="">
	</article>
</section>

<section class="middle">
	<h2>Repositories</h2>
	<div class="repos">
		{#each repos as repo}
		<div class="repository">
			<h2><a href={repo.html_url} target="_blank">{repo.name}</a></h2>
			<img src={repo.owner.avatar_url} width="50" height="50">
			<p>{repo.owner.login}</p>
		</div>
		{/each}
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
	}

	.about > article > p {
		text-align: center;
		/* max-width: 90vw; */
	}
</style>
