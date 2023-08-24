import React from "react";

function Presentation() {
  return (
    <div className={"w-full md:max-w-4xl"}>
      <div
        className={"mb-10 grid grid-cols-2 place-items-center gap-5 lg:gap-10"}
      >
        <img
          src={"/images/insight/img-1.jpg"}
          alt={"First Index's Image"}
          className={
            "w-full justify-self-end rounded-lg shadow-lg shadow-gray-600"
          }
        />
        <p
          className={
            "w-full justify-self-start text-start text-sm md:text-xl lg:text-2xl"
          }
        >
          Forgez votre physique parfait. Ares Gym est la destination ultime pour
          les culturistes, offrant des installations de premier ordre et des
          conseils d'experts pour vous aider à sculpter le corps de vos rêves.
        </p>
      </div>
      <div className={"mb-10 grid grid-cols-2 place-items-center gap-10"}>
        <p
          className={
            "w-full justify-self-end text-end text-sm md:text-xl lg:text-2xl"
          }
        >
          Forgez votre physique parfait. Ares Gym est la destination ultime pour
          les culturistes, offrant des installations de premier ordre et des
          conseils d'experts pour vous aider à sculpter le corps de vos rêves.
        </p>
        <img
          src={"/images/insight/img-2.jpg"}
          alt={"Second Index's Image"}
          className={
            "w-full justify-self-start rounded-lg shadow-lg shadow-gray-600"
          }
        />
      </div>
    </div>
  );
}

export default Presentation;
