const dialogueBoss = document.querySelector(".texte-dialogue-boss");
const choixReponses = document.querySelector(".choix-reponses");
const reponse = choixReponses?.querySelector(".bulle-reponse");

if (dialogueBoss && choixReponses && reponse) {
    const bulleDialogue = dialogueBoss.closest(".bulle-dialogue");
    const texte = dialogueBoss.textContent?.trim() ?? "";
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
            dialogueBoss.textContent = texte;
            afficherReponse();
            return;
        }

        if (bulleDialogue) {
            const { width, height } = bulleDialogue.getBoundingClientRect();
            bulleDialogue.style.width = `${width}px`;
            bulleDialogue.style.height = `${height}px`;
        }

        let index = 0;
        dialogueBoss.textContent = "";

        function afficherProchainCaractere() {
            if (index < texte.length) {
                dialogueBoss.textContent += texte[index];
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

    document.fonts.ready.then(demarrerDialogue);
}