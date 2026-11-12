const dialogue = document.querySelector(".texte-dialogue");
const choixReponses = document.querySelector(".choix-reponses");
const reponse = choixReponses?.querySelector(".bulle-reponse");

if (dialogue && choixReponses && reponse) {
    const texte = dialogue.textContent?.trim() ?? "";
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function afficherReponse() {
        choixReponses.classList.add("visible");
        reponse.removeAttribute("aria-hidden");
        reponse.removeAttribute("tabindex");
    }

    if (prefersReducedMotion) {
        dialogue.textContent = texte;
        afficherReponse();
    } else {
        let index = 0;
        dialogue.textContent = "";

        function afficherProchainCaractere() {
            if (index < texte.length) {
                dialogue.textContent += texte[index];
                index += 1;

                if (index < texte.length) {
                    window.setTimeout(afficherProchainCaractere, 30);
                } else {
                    afficherReponse();
                }
            } else {
                afficherReponse();
            }
        }

        afficherProchainCaractere();
    }
}