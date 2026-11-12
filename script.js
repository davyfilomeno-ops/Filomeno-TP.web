const dialogue = document.querySelector(".texte-intro");

if (dialogue) {
    const texte = dialogue.textContent ?? "";
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        dialogue.textContent = texte;
    } else {
        let index = 0;
        dialogue.textContent = "";

        function afficherTexte() {
            if (index < texte.length) {
                dialogue.textContent += texte[index];
                index += 1;
                window.setTimeout(afficherTexte, 30);
            }
        }

        afficherTexte();
    }
}