import React from "react";

import Part from "@/components/Copyright/Part";

function Copyright() {
  function openModal() {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    dialog.addEventListener("click", clickOutsideModal);
  }

  function closeModal() {
    const dialog = document.querySelector("dialog");
    dialog.close();
    dialog.removeEventListener("click", clickOutsideModal);
  }

  function clickOutsideModal(e) {
    const dialog = document.querySelector("dialog");
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  }

  return (
    <section
      className={
        "flex w-full flex-col items-center justify-center gap-y-2 bg-zinc-900 px-5 py-10 text-center font-inter-extralight text-xs text-zinc-100 md:px-20"
      }
    >
      <p>© 2023 Ares Gym. Tous droits réservés.</p>
      <p
        onClick={openModal}
        className={"underline underline-offset-2 hover:cursor-pointer"}
      >
        Conditions d&apos;Utilisation et Politique de Confidentialité.
      </p>

      <dialog
        className={
          "z-30 max-h-96 rounded-md border-none bg-zinc-50 p-5 scrollbar scrollbar-thin scrollbar-track-zinc-200 scrollbar-thumb-zinc-500 scrollbar-track-rounded-md scrollbar-thumb-rounded-md backdrop:bg-[rgba(0,0,0,0.50)]"
        }
      >
        <div
          className={"flex max-w-md flex-col items-center gap-y-5 text-black"}
        >
          <Part
            title={"Avis de Copyright"}
            content={"© 2023 Ares Gym. Tous droits réservés."}
          />
          <Part
            title={"Utilisation du Contenu"}
            content={
              "Le contenu, les images et le logo de ce site web sont la propriété intellectuelle " +
              "d&apos;Ares Gym et sont protégés par le droit d&apos;auteur. " +
              "Toute reproduction ou utilisation non autorisée de tout contenu sans consentement écrit préalable est interdite."
            }
          />
          <Part
            title={"Conditions d&apos;Utilisation"}
            content={
              "Le contenu fourni sur ce site web est à titre informatif général uniquement. " +
              "Il est susceptible de changer sans préavis. " +
              "Ares Gym ne fait aucune déclaration ni garantie d&apos;aucune sorte, expresse ou implicite, concernant l&apos;exactitude, " +
              "la fiabilité ou la disponibilité du contenu du site web. " +
              "Toute confiance que vous placez dans de telles informations est à vos propres risques."
            }
          />
          <Part
            title={"Clause de Non-responsabilité"}
            content={
              "Ares Gym ne sera pas responsable de toute perte, blessure, réclamation, responsabilité " +
              "ou dommage de quelque nature que ce soit résultant de votre utilisation du site web ou de tout contenu fourni ici."
            }
          />
          <Part
            title={"Contact"}
            content={
              "Si vous avez des questions ou des préoccupations concernant le contenu de ce site web, " +
              "veuillez nous contacter à l&apos;adresse HamzaLinge@gmail.com."
            }
          />
          <Part
            title={"Dernière Mise à Jour"}
            content={
              "Cet avis de copyright et cette politique sont susceptibles de changer sans préavis.\n" +
              "Dernière mise à jour : 30/08/2023"
            }
          />
          <p
            className={
              "rounded-lg bg-zinc-700 px-6 py-4 text-zinc-50 hover:cursor-pointer hover:bg-zinc-900"
            }
            onClick={closeModal}
          >
            Fermer
          </p>
        </div>
      </dialog>
    </section>
  );
}

export default Copyright;
