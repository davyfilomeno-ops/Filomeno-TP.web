const dialoguePatron = document.querySelector(".texte-dialogue-patron");
const choixReponses = document.querySelector(".choix-reponses");

if (dialoguePatron && choixReponses) {
    const reponses = choixReponses.querySelectorAll(".bulle-reponse");
    const texte = dialoguePatron.textContent?.trim() ?? "";
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

    function demarrerDialogue() {
        if (prefersReducedMotion) {
            dialoguePatron.textContent = texte;
            afficherReponses();
            return;
        }

        let index = 0;
        dialoguePatron.textContent = "";

        function afficherProchainCaractere() {
            if (index < texte.length) {
                dialoguePatron.textContent += texte[index];
                index += 1;

                if (index < texte.length) {
                    window.setTimeout(afficherProchainCaractere, 30);
                } else {
                    afficherReponses();
                }
            } else {
                afficherReponses();
            }
        }

        afficherProchainCaractere();
    }

    document.fonts.ready.then(demarrerDialogue);
}