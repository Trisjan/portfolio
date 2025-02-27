<script>
import { onMount } from "svelte";

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

<section>
	<h1>
		Welcome to your new<br />SvelteKit app
	</h1>
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
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
