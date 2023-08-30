import React from "react";
import CardPresentation from "@/components/Insight/Presentation/CardPresentation";

function Presentation() {
  return (
    <div className={"w-full md:max-w-4xl"}>
      <CardPresentation
        pathImg={"/images/insight/img-1.jpg"}
        text={
          "Forgez votre physique parfait. Ares Gym est la destination ultime pour " +
          "les culturistes, offrant des installations de premier ordre " +
          "et des conseils d'experts pour vous aider à sculpter le corps de vos rêves."
        }
        reverse={false}
      />
      <CardPresentation
        pathImg={"/images/insight/img-2.jpg"}
        text={
          "Façonnez votre corps idéal. Ares Gym vous offre une destination inégalée pour atteindre vos objectifs de musculation. " +
          "Avec des installations de pointe et un environnement motivant, " +
          "nous sommes là pour accompagner chaque étape de votre parcours vers un nouveau vous."
        }
        reverse={true}
      />
    </div>
  );
}

export default Presentation;
