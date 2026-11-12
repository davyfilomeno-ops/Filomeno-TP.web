const dialogueBoss = document.querySelector(".texte-dialogue-boss");
const dialoguePrincipal = document.querySelector(".texte-dialogue-principal");
const bullePrincipal = document.querySelector(".bulle-dialogue-principal");
const choixReponses = document.querySelector(".choix-reponses");
const reponse = choixReponses?.querySelector(".bulle-reponse");

if (dialogueBoss && dialoguePrincipal && bullePrincipal && choixReponses && reponse) {
    const bulleBoss = dialogueBoss.closest(".bulle-dialogue");
    const texteBoss = dialogueBoss.textContent?.trim() ?? "";
    const textePrincipal = dialoguePrincipal.textContent?.trim() ?? "";
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function afficherReponse() {
        choixReponses.classList.add("visible");
        reponse.removeAttribute("aria-hidden");
        reponse.removeAttribute("tabindex");
    }

    function demarrerDialogue() {
        if (prefersReducedMotion) {
            dialogueBoss.textContent = texteBoss;
            dialoguePrincipal.textContent = textePrincipal;
            bullePrincipal.classList.add("visible");
            afficherReponse();
            return;
        }

        [bulleBoss, bullePrincipal].forEach((bulle) => {
            if (bulle) {
                const { width, height } = bulle.getBoundingClientRect();
                bulle.style.width = `${width}px`;
                bulle.style.height = `${height}px`;
            }
        });

        function afficherTexte(element, texte, terminer) {
            let index = 0;
            element.textContent = "";

            function afficherProchainCaractere() {
                if (index < texte.length) {
                    element.textContent += texte[index];
                    index += 1;

                    if (index < texte.length) {
                        window.setTimeout(afficherProchainCaractere, 30);
                    } else {
                        terminer();
                    }
                } else {
                    terminer();
                }
            }

            afficherProchainCaractere();
        }

        afficherTexte(dialogueBoss, texteBoss, () => {
            bullePrincipal.classList.add("visible");
            afficherTexte(dialoguePrincipal, textePrincipal, afficherReponse);
        });
    }

    document.fonts.ready.then(demarrerDialogue);
}
