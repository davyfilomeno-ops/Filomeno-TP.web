const dialogueDroite = document.querySelector(".texte-dialogue-droite");
const dialogueGauche = document.querySelector(".texte-dialogue-gauche");
const bulleGauche = document.querySelector(".bulle-dialogue-gauche");

if (dialogueDroite && dialogueGauche && bulleGauche) {
    const texteDroite = dialogueDroite.textContent?.trim() ?? "";
    const texteGauche = dialogueGauche.textContent?.trim() ?? "";
    const bulleDroite = dialogueDroite.closest(".bulle-dialogue");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (bulleDroite) {
        function demarrerDialogues() {
            if (prefersReducedMotion) {
                dialogueDroite.textContent = texteDroite;
                dialogueGauche.textContent = texteGauche;
                bulleGauche.classList.add("visible");
            } else {
                function figerTailleBulle(bulle) {
                    const { width, height } = bulle.getBoundingClientRect();
                    bulle.style.width = `${width}px`;
                    bulle.style.height = `${height}px`;
                }

                figerTailleBulle(bulleDroite);
                figerTailleBulle(bulleGauche);

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
                    afficherTexte(dialogueGauche, texteGauche, () => {});
                });
            }
        }

        document.fonts.ready.then(demarrerDialogues);
    }
}