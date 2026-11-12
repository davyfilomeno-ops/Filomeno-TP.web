const dialogueDroite = document.querySelector(".texte-dialogue-droite");
const dialogueGauche = document.querySelector(".texte-dialogue-gauche");
const bulleGauche = document.querySelector(".bulle-dialogue-gauche");
const choixReponses = document.querySelector(".choix-reponses");

if (dialogueDroite && dialogueGauche && bulleGauche && choixReponses) {
    const reponses = choixReponses.querySelectorAll(".bulle-reponse");
    const texteDroite = dialogueDroite.textContent?.trim() ?? "";
    const texteGauche = dialogueGauche.textContent?.trim() ?? "";
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function afficherReponses() {
        choixReponses.classList.add("visible");
        reponses.forEach((reponse) => {
            reponse.removeAttribute("aria-hidden");
            reponse.removeAttribute("tabindex");
        });
    }

    if (prefersReducedMotion) {
        dialogueDroite.textContent = texteDroite;
        dialogueGauche.textContent = texteGauche;
        bulleGauche.classList.add("visible");
        afficherReponses();
    } else {
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

        afficherTexte(dialogueDroite, texteDroite, () => {
            bulleGauche.classList.add("visible");
            afficherTexte(dialogueGauche, texteGauche, afficherReponses);
        });
    }
}