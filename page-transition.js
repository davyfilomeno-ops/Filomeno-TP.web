const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
    const transitionDuration = 260;
    const enterDuration = 300;

    function showPage() {
        document.body.classList.remove("page-transition-out");
        document.body.classList.add("page-transition-enter");
        window.setTimeout(() => {
            document.body.classList.remove("page-transition-enter");
        }, enterDuration);
    }

    showPage();

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            showPage();
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !(event.target instanceof Element) ||
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        const link = event.target.closest("a");

        if (
            !link ||
            link.target ||
            link.hasAttribute("download") ||
            link.relList.contains("external")
        ) {
            return;
        }

        const destination = new URL(link.href, window.location.href);

        if (
            destination.origin !== window.location.origin ||
            (destination.pathname === window.location.pathname &&
                destination.search === window.location.search)
        ) {
            return;
        }

        event.preventDefault();
        document.body.classList.add("page-transition-out");
        window.setTimeout(() => {
            window.location.assign(destination.href);
        }, transitionDuration);
    });
}
