const dialogue = document.querySelector(".texte-reponse2");
const choixReponses = document.querySelector(".choix-reponses");

if (dialogue && choixReponses) {
    const texte = dialogue.textContent ?? "";
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function afficherReponses() {
        choixReponses.classList.add("visible");
    }

    if (prefersReducedMotion) {
        dialogue.textContent = texte;
        afficherReponses();
    } else {
        let index = 0;
        dialogue.textContent = "";

        function afficherTexte() {
            if (index < texte.length) {
                dialogue.textContent += texte[index];
                index += 1;
                if (index < texte.length) {
                    window.setTimeout(afficherTexte, 30);
                } else {
                    afficherReponses();
                }
            }
        }

        if (texte.length > 0) {
            afficherTexte();
        } else {
            afficherReponses();
        }
    }
}
