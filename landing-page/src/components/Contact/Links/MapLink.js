import React, { useEffect, useState } from "react";

import { FaMapMarkedAlt } from "react-icons/fa";
import { cn } from "../../../../utils";

function MapLink() {
  const [clipboardNotification, setClipboardNotification] = useState(false);

  const position = "";

  function handleClick() {
    navigator.clipboard.writeText(position).then(() => {
      setClipboardNotification(true);
    });
  }

  useEffect(() => {
    if (!clipboardNotification) return;
    const idTimeout = setTimeout(() => setClipboardNotification(false), 4000);
    return () => clearTimeout(idTimeout);
  }, [clipboardNotification]);

  return (
    <div className={"relative flex flex-col items-center justify-center"}>
      <FaMapMarkedAlt
        className={"h-14 w-14 text-red-600 hover:cursor-pointer"}
        onClick={handleClick}
      />
      <p
        className={cn(
          "absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-[calc(100%_+_4px)] whitespace-nowrap rounded-lg bg-zinc-200 p-2 text-xs font-semibold text-green-900 opacity-0",
          { "animate-display-clipboard-notification": clipboardNotification },
          { "z-0": clipboardNotification }
        )}
      >
        <span>Adresse Map Copiée !</span>
        <span
          id={"clipboardNotification"}
          style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0)" }}
          className={
            "absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-[calc(100%_-_1px)] bg-zinc-200"
          }
        ></span>
      </p>
    </div>
  );
}

export default MapLink;
