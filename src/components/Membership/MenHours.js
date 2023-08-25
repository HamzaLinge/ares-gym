import React from "react";
import { GiSwordman, GiSpartanHelmet, GiZeusSword } from "react-icons/gi";

import CardDayHours from "@/components/Membership/CardDayHours";
import CardMembership from "@/components/Membership/CardMembership";

export default function MenHours() {
  return (
    <section className={"flex h-screen w-full flex-col bg-blue-900 p-4"}>
      <h2 className={"mb-10 text-base uppercase"}>Heures pour Hommes</h2>
      <div
        className={
          "relative flex w-full grow flex-col items-center justify-between"
        }
      >
        <p className={"relative"}>
          <span>
            Frappez le fer comme un dieu grec pendant ces heures dédiées :
          </span>
          <GiSwordman
            className={
              "-rotate-30 absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 translate-y-full text-white opacity-50"
            }
          />
        </p>
        <div className={"grid w-full grid-cols-2 justify-items-center gap-x-2"}>
          <CardMembership
            title={"Spartan"}
            price={3000}
            attributes={["Musculation", "Cardio", "Douche"]}
            session={3}
            Icon={GiSpartanHelmet}
          />
          <CardMembership
            title={"Zeus"}
            price={4300}
            attributes={["Musculation", "Cardio", "Douche"]}
            session={null}
            Icon={GiZeusSword}
          />
        </div>
        {/*<div className={"relative grid w-full grid-cols-2"}>*/}

        {/*<div className={"flex w-full flex-col items-center gap-y-4"}>*/}
        {/*  <CardDayHours*/}
        {/*    day={"Dimanche"}*/}
        {/*    hoursIntervals={[{ start: 7, end: 23 }]}*/}
        {/*  />*/}
        {/*  <CardDayHours*/}
        {/*    day={"Lundi"}*/}
        {/*    hoursIntervals={[{ start: 7, end: 23 }]}*/}
        {/*  />*/}
        {/*  <CardDayHours*/}
        {/*    day={"Mardi"}*/}
        {/*    hoursIntervals={[*/}
        {/*      { start: 7, end: 14 },*/}
        {/*      { start: 18, end: 23 },*/}
        {/*    ]}*/}
        {/*  />*/}
        {/*  <CardDayHours*/}
        {/*    day={"Mercredi"}*/}
        {/*    hoursIntervals={[{ start: 7, end: 23 }]}*/}
        {/*  />*/}
        {/*  <CardDayHours*/}
        {/*    day={"Jeudi"}*/}
        {/*    hoursIntervals={[*/}
        {/*      { start: 7, end: 14 },*/}
        {/*      { start: 18, end: 23 },*/}
        {/*    ]}*/}
        {/*  />*/}
        {/*  <CardDayHours*/}
        {/*    day={"Vendredi"}*/}
        {/*    hoursIntervals={[{ start: 17, end: 23 }]}*/}
        {/*  />*/}
        {/*  <CardDayHours*/}
        {/*    day={"Samedi"}*/}
        {/*    hoursIntervals={[*/}
        {/*      { start: 7, end: 14 },*/}
        {/*      { start: 18, end: 23 },*/}
        {/*    ]}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
