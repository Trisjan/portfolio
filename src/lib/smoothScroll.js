// Gedeelde Lenis-instantie, zodat bijvoorbeeld het menu het scrollen kan pauzeren.
// Blijft null wanneer iemand 'minder beweging' heeft ingesteld.

/** @type {import('lenis').default | null} */
let lenis = null;

/** @param {import('lenis').default | null} instance */
export function setLenis(instance) {
	lenis = instance;
}

/** Zet het scrollen van de pagina op slot (bijv. als het menu open is) */
export function lockScroll() {
	if (lenis) lenis.stop();
	else document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll() {
	if (lenis) lenis.start();
	else document.documentElement.style.overflow = '';
}

/** @param {HTMLElement | number} target */
export function scrollToTarget(target) {
	if (lenis) {
		lenis.scrollTo(target, { duration: 1.4 });
		return;
	}
	const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
	window.scrollTo({ top });
}
