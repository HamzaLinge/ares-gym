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
          "Forgez votre physique parfait. Ares Gym est la destination ultime pour " +
          "les culturistes, offrant des installations de premier ordre " +
          "et des conseils d'experts pour vous aider à sculpter le corps de vos rêves."
        }
        reverse={true}
      />
    </div>
  );
}

export default Presentation;
