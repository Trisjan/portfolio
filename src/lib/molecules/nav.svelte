<script>
    import { About_logo, Alifuru_leafs } from "$lib/index.js";
    import { lockScroll, unlockScroll, scrollToTarget } from "$lib/smoothScroll.js";
    import { goto } from "$app/navigation";
    import { gsap } from "gsap";
    import { onMount } from 'svelte';

    const links = [
        { href: '/', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#work', label: 'My work' },
    ];

    let menuOpen = $state(false);
    let headerHidden = $state(false);
    let scrolled = $state(false);
    let lastScrollY = 0;

    /** @type {HTMLButtonElement} */
    let toggleButton;
    /** @type {HTMLDivElement} */
    let menu;
    /** @type {gsap.core.Timeline | null} */
    let menuTimeline = null;

    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function openMenu() {
        menuOpen = true;
        headerHidden = false;
        lockScroll();
        document.querySelector('main')?.setAttribute('inert', '');

        // Het menu groeit als een cirkel vanuit de menuknop
        const rect = toggleButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

        menuTimeline?.kill();
        menuTimeline = gsap.timeline({
            onComplete: () => menu.querySelector('a')?.focus(),
        })
            .set(menu, { visibility: 'visible' })
            .fromTo(menu, {
                clipPath: `circle(0px at ${x}px ${y}px)`,
            }, {
                clipPath: `circle(${radius}px at ${x}px ${y}px)`,
                duration: 0.8,
                ease: 'power3.inOut',
            })
            .fromTo(menu.querySelectorAll('.link_text'), {
                yPercent: 110,
                rotate: 4,
            }, {
                yPercent: 0,
                rotate: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power4.out',
            }, '-=0.35')
            .fromTo(menu.querySelectorAll('.link_number'), {
                autoAlpha: 0,
                x: -12,
            }, {
                autoAlpha: 0.6,
                x: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
            }, '<0.2')
            .fromTo(menu.querySelectorAll('.mobile_menu_footer > *'), {
                autoAlpha: 0,
                y: 20,
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
            }, '<0.1');

        if (prefersReducedMotion()) menuTimeline.progress(1);
    }

    function closeMenu({ restoreFocus = true } = {}) {
        if (!menuOpen) return;
        menuOpen = false;
        unlockScroll();
        document.querySelector('main')?.removeAttribute('inert');

        const done = () => {
            gsap.set(menu, { visibility: 'hidden' });
            if (restoreFocus) toggleButton.focus();
        };

        if (!menuTimeline || prefersReducedMotion()) {
            done();
            return;
        }
        menuTimeline.eventCallback('onComplete', null);
        menuTimeline.eventCallback('onReverseComplete', done);
        menuTimeline.timeScale(1.8).reverse();
    }

    function toggleMenu() {
        if (menuOpen) closeMenu();
        else openMenu();
    }

    /**
     * @param {MouseEvent} event
     * @param {string} href
     */
    function handleMenuLink(event, href) {
        event.preventDefault();
        closeMenu({ restoreFocus: false });

        // Op een andere pagina eerst terug naar de homepagina
        if (window.location.pathname !== '/') {
            goto(href === '/' ? '/' : `/${href}`);
            return;
        }

        const target = href === '/' ? 0 : document.querySelector(href);
        if (target !== null) scrollToTarget(/** @type {HTMLElement | number} */ (target));
    }

    // Header verdwijnt bij naar beneden scrollen en komt terug bij omhoog scrollen
    function handleScroll() {
        const y = window.scrollY;
        scrolled = y > 10;
        if (Math.abs(y - lastScrollY) < 5) return;
        if (!menuOpen) headerHidden = y > lastScrollY && y > 80;
        lastScrollY = y;
    }

    /** @param {KeyboardEvent} event */
    function handleKeydown(event) {
        if (event.key === 'Escape' && menuOpen) closeMenu();
    }

    onMount(() => {
        gsap.from(['.mobile_header', '.navbar_contents'], {
            duration: 1,
            opacity: 0,
            y: -100,
            ease: 'power3.out',
            clearProps: 'all',
        });

        // Menu sluiten wanneer het scherm breed genoeg wordt voor de desktop-navigatie
        const desktop = window.matchMedia('(min-width: 65.0625rem)');
        const handleChange = () => {
            if (desktop.matches) closeMenu({ restoreFocus: false });
        };
        desktop.addEventListener('change', handleChange);
        return () => desktop.removeEventListener('change', handleChange);
    });
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKeydown} />

<header
    class="mobile_header"
    class:hidden={headerHidden}
    class:scrolled
    class:open={menuOpen}
>
    <a href="/" class="brand" onclick={(event) => handleMenuLink(event, '/')}>Trisjan Mustamu</a>
    <button
        bind:this={toggleButton}
        class="menu_toggle"
        onclick={toggleMenu}
        aria-label={menuOpen ? 'Sluit menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
    >
        <span class="menu_toggle_label" aria-hidden="true">
            <span>Menu</span>
            <span>Sluit</span>
        </span>
        <span class="menu_toggle_bars" aria-hidden="true">
            <span></span>
            <span></span>
        </span>
    </button>
</header>

<div class="mobile_menu" id="mobile-menu" bind:this={menu} inert={!menuOpen}>
    <nav aria-label="Hoofdmenu">
        <ul>
            {#each links as link, i}
                <li>
                    <a href={link.href} onclick={(event) => handleMenuLink(event, link.href)}>
                        <span class="link_number">0{i + 1}</span>
                        <span class="link_text">{link.label}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    <div class="mobile_menu_footer">
        <img src={About_logo} alt="" class="mobile_menu_logo">
        <p>Contact</p>
        <a href="mailto:TrisjanM@gmail.com">TrisjanM@gmail.com</a>
        <img src={Alifuru_leafs} alt="" class="mobile_menu_leafs">
    </div>
</div>

<nav class="navbar_contents" aria-label="Hoofdmenu">
	<ul>
		<li class="home-li"><a href="/">Trisjan Mustamu</a></li>
		<li><a href="/" class="active-link">Home</a></li>
		<li><a href="#about">About</a></li>
		<li><a href="#work">My work</a></li>
	</ul>
</nav>

<style>
    .mobile_header,
    .mobile_menu {
        display: none;
    }

    .navbar_contents > ul {
        list-style: none;
        display: flex;
        padding: 0;
        font-weight: 700;
    }

    .navbar_contents .home-li {
        margin-right: auto;
    }

    .navbar_contents a {
        display: flex;
        text-decoration: none;
        padding: 1rem 2rem;
        transition: color 0.3s ease-in-out;
        color: #000;
        text-transform: uppercase;
        font-size: 1.2rem;
    }

    .navbar_contents a:hover {
        color: #ff0000;
    }

    .navbar_contents a.active-link {
        text-decoration: underline solid;
    }

    @media (max-width: 65rem) {
        .navbar_contents {
            display: none;
        }

        /* Header */
        .mobile_header {
            position: fixed;
            inset: 0 0 auto 0;
            z-index: 30;
            height: var(--header-height);
            padding: 0 1.5rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transition:
                transform 0.5s cubic-bezier(0.65, 0, 0.35, 1),
                background-color 0.4s ease,
                box-shadow 0.4s ease;
        }

        .mobile_header.scrolled {
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
        }

        .mobile_header.hidden {
            transform: translateY(-100%);
        }

        .mobile_header.open {
            background-color: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            box-shadow: none;
        }

        .brand {
            color: #000;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 1.1rem;
            letter-spacing: 0.02em;
            transition: color 0.4s ease;
        }

        .open .brand {
            color: #fff;
        }

        /* Menuknop: label wisselt en de streepjes worden een kruis */
        .menu_toggle {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-right: -0.5rem;
            padding: 0.5rem;
            border: none;
            background: none;
            color: #000;
            font: inherit;
            font-size: 0.8rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            cursor: pointer;
            transition: color 0.4s ease;
        }

        .open .menu_toggle {
            color: #fff;
        }

        .menu_toggle:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
            border-radius: 4px;
        }

        .menu_toggle_label {
            display: flex;
            flex-direction: column;
            height: 1.2em;
            line-height: 1.2em;
            overflow: hidden;
        }

        .menu_toggle_label > span {
            transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .open .menu_toggle_label > span {
            transform: translateY(-100%);
        }

        .menu_toggle_bars {
            position: relative;
            width: 1.75rem;
            height: 0.875rem;
        }

        .menu_toggle_bars > span {
            position: absolute;
            right: 0;
            width: 100%;
            height: 2px;
            border-radius: 2px;
            background-color: currentColor;
            transition:
                transform 0.5s cubic-bezier(0.65, 0, 0.35, 1),
                width 0.3s ease;
        }

        .menu_toggle_bars > span:first-child {
            top: 0;
        }

        .menu_toggle_bars > span:last-child {
            bottom: 0;
            width: 65%;
        }

        .menu_toggle:hover .menu_toggle_bars > span:last-child {
            width: 100%;
        }

        .open .menu_toggle_bars > span:first-child {
            transform: translateY(0.375rem) rotate(45deg);
        }

        .open .menu_toggle_bars > span:last-child {
            width: 100%;
            transform: translateY(-0.375rem) rotate(-45deg);
        }

        /* Fullscreen menu */
        .mobile_menu {
            position: fixed;
            inset: 0;
            z-index: 25;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 2rem;
            padding: calc(var(--header-height) + 2rem) 1.5rem 2rem;
            box-sizing: border-box;
            overflow-y: auto;
            background-color: var(--color-bg-1);
            color: var(--color-text-2);
            visibility: hidden;
        }

        .mobile_menu ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .mobile_menu li {
            overflow: hidden; /* masker waar de links in schuiven */
        }

        .mobile_menu li > a {
            display: flex;
            align-items: baseline;
            gap: 1rem;
            color: var(--color-text-2);
            text-decoration: none;
            text-transform: uppercase;
            font-size: clamp(2.75rem, 13vw, 4.5rem);
            font-weight: 500;
            line-height: 1.15;
        }

        .link_number {
            font-size: 0.85rem;
            font-weight: 300;
            letter-spacing: 0.1em;
            opacity: 0.6;
        }

        .link_text {
            display: inline-block;
            transform-origin: left bottom;
            transition: color 0.3s ease;
        }

        .mobile_menu li > a:hover .link_text,
        .mobile_menu li > a:focus-visible .link_text {
            color: #ff0000;
        }

        .mobile_menu li > a:focus-visible {
            outline: none;
        }

        .mobile_menu_footer {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }

        .mobile_menu_footer > p {
            margin: 0;
            font-size: 0.75rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            opacity: 0.6;
        }

        .mobile_menu_footer > a {
            color: var(--color-text-2);
            font-weight: 300;
            transition: color 0.3s ease;
        }

        .mobile_menu_footer > a:hover {
            color: #ff0000;
        }

        .mobile_menu_logo {
            height: 2.5rem;
            width: auto;
            align-self: flex-start;
            margin-bottom: 1rem;
        }

        .mobile_menu_leafs {
            width: 100%;
            height: 1.5rem;
            object-fit: cover;
            margin-top: 1.5rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mobile_header,
        .menu_toggle_label > span,
        .menu_toggle_bars > span {
            transition: none;
        }
    }
</style>
