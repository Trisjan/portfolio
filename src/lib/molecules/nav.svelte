<script>
    import { Hamburger_logo, Close_logo } from "$lib/index.js";
    import { onMount } from "svelte";

    let sidebarVisible = false;

    function showSidebar() {
        sidebarVisible = true;
    }

    function hideSidebar() {
        sidebarVisible = false;
    }
</script>

<!-- Sidebar Menu -->
<nav class="sidebar" class:visible={sidebarVisible}>
    <ul>
        <li on:click={hideSidebar}>
            <a href="#"><img src={Close_logo} alt="close button" height="26" width="26"></a>
        </li>
        <li><a href="#">My work</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
</nav>

<!-- Hoofdmenu -->
<nav>
    <ul>
        <li><a href="#">Trisjan Mustamu</a></li>
        <li class="hideOnMobile"><a href="#">My work</a></li>
        <li class="hideOnMobile"><a href="#">Contact</a></li>
        <li class="menu-button" on:click={showSidebar}>
            <a href="#"><img src={Hamburger_logo} alt="hamburger menu" height="26" width="26"></a>
        </li>
    </ul>
</nav>

<style>
    nav ul {
        width: 100%;
        list-style: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: fixed;
        margin: 0;
        padding: 0;
    }

    nav ul li {
        height: 3rem;
    }

    nav ul li a {
        text-decoration: none;
        height: 100%;
        padding: 0 2rem;
        color: var(--color-text-1);
        transition: 0.3s;
        display: flex;
        align-items: center;
    }

    nav ul li:not(:first-child) a:hover {
        color: red;
    }
    
    nav ul li:first-child {
        margin-right: auto;
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 16rem;
        z-index: 999;
        background-color: var(--color-bg-0);
        box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
        
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        padding: 1rem;

        /* Beginwaarden voor verborgen staat */
        transform: translateX(100%);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    /* Sidebar tonen */
    .sidebar.visible {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
    }

    .sidebar li {
        width: 100%;
    }

    .sidebar a {
        width: 100%;
    }

    .menu-button {
        display: none;
    }

    @media (max-width: 800px) {
        .hideOnMobile {
            display: none;
        }
        .menu-button {
            display: block;
        }
    }
</style>
