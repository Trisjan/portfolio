<script>
    import { Hamburger_logo, Close_logo } from "$lib/index.js";
    let sidebarOpen = false;
    const navLinks = document.querySelectorAll('.navbar_contents a');
    const media = window.matchMedia('(max-width: 65rem)');


    media.addEventListener('change', (event) => {
        handleMediaChange(event);
    });
    function handleMediaChange(event) {
        const navbar = document.getElementById('navbar');
        console.log('Media query changed:', event.matches);
        if (event.matches) {
            navbar.setAttribute('inert', '')
        }
        else {
            navbar.removeAttribute('inert');
            sidebarOpen = false; // Close sidebar when media query changes
        }
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarOpen = false;
        });
    });
</script>

<nav class="mobile_navbar">
	<a href="/">Trisjan Mustamu</a>
	<button
		id="open-sidebar-button"
		on:click={() => sidebarOpen = true}
		aria-label="Open menu"
		aria-expanded={sidebarOpen}
		aria-controls="navbar"
	>
		<img src={Hamburger_logo} alt="Hamburger menu icon" width="30px" height="30px" />
	</button>
</nav>

<nav class="navbar_contents" id="navbar" class:show={sidebarOpen}>
	<ul>
		<li>
			<button
				id="close-sidebar-button"
				on:click={() => sidebarOpen = false}
				aria-label="Close menu"
			>
				<img src={Close_logo} alt="Close menu icon" width="30px" height="30px" />
			</button>
		</li>
		<li class="home-li"><a href="/">Trisjan Mustamu</a></li>
		<li><a href="/" class="active-link">Home</a></li>
		<li><a href="/repositories">My work</a></li>
		<li><a href="#">Contact</a></li>
        <li><a href="#work">Contact</a></li>
	</ul>
</nav>
<div id="overlay" on:click={() => sidebarOpen = false} aria-hidden="true"></div>

<style>
    .mobile_navbar {
        display: none;
    }
    .navbar_contents > ul {
        list-style: none;
        display: flex;
        padding: 0;
		mix-blend-mode: difference;
		color: white !important;
    }

    .navbar_contents .home-li {
        margin-right: auto;
    }

    .navbar_contents a {
        display: flex;
        text-decoration: none;
        padding: 1rem 2rem;
        transition: color 0.3s ease-in-out;
        color: #fff;
        text-transform: uppercase;
        font-size: 1.2rem;
    }

    .navbar_contents a:hover {
        color: #ff0000;
    }

    .navbar_contents a.active-link {
        text-decoration: underline solid;
    }
    #open-sidebar-button {  
        background: none;
        border: none;
        padding: 1rem;
        margin-left: auto;
        cursor: pointer;
    }
    #close-sidebar-button {
        display: none;
        background: none;
        border: none;
        padding: 1rem 1rem 1rem 2.5rem;
        cursor: pointer;
    }

    @media (max-width: 65rem) {
        #open-sidebar-button, #close-sidebar-button {
            display: block;
        }
        #overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9;
            display: none;
        }
        .mobile_navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
            text-transform: uppercase;
        }
        .mobile_navbar a {
            text-decoration: none;
            color: #000;
            font-size: 1.2rem;
            font-weight: 700;
        }
        .navbar_contents {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: min(20em, 100%);
            z-index: 10;
            background-color: #fff;
            transition: right 0.3s ease-in-out;
        }
        .navbar_contents.show {
            right: 0;
        }
        .navbar_contents.show ~ #overlay {
            display: block;
        }
        .navbar_contents ul {
            flex-direction: column;
            width: 100%;
        }
        .navbar_contents a {
            width: 100%;
            padding-left: 2.5rem;
        }
        .navbar_contents a.active-link {
            text-decoration: none;
        }
        .navbar_contents .home-li {
            margin-right: unset;
        }
    }
</style>
