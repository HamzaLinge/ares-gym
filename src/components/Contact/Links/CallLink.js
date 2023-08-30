import React, { useEffect, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";

import { cn, isMobileDevice } from "../../../../utils";

function CallLink() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [clipboardNotification, setClipboardNotification] = useState(false);

  const phoneNumber = "+213558406223";

  function handleClick() {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setClipboardNotification(true);
    });
  }

  useEffect(() => {
    if (!clipboardNotification) return;
    const idTimeout = setTimeout(() => setClipboardNotification(false), 4000);
    return () => clearTimeout(idTimeout);
  }, [clipboardNotification]);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  if (!pageLoaded) return undefined;

  if (isMobileDevice()) {
    return (
      <a href={`tel:${phoneNumber}`}>
        <BiSolidPhoneCall
          className={"h-24 w-24 text-[#25D366] hover:cursor-pointer"}
        />
        <p className={"text-xs font-light capitalize text-zinc-50"}>
          Appeler Maintenant
        </p>
      </a>
    );
  }

  return (
    <div className={"relative flex flex-col items-center"}>
      <BiSolidPhoneCall
        className={"h-24 w-24 text-[#25D366] hover:cursor-pointer"}
        onClick={handleClick}
      />
      <p className={"text-xs font-light text-zinc-50"}>Copier le Numéro</p>
      <p
        className={cn(
          "absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-[calc(100%_+_4px)] whitespace-nowrap rounded-lg bg-zinc-200 p-2 text-xs font-semibold text-green-900 opacity-0",
          { "animate-display-clipboard-notification": clipboardNotification },
          { "z-0": clipboardNotification }
        )}
      >
        <span>Numéro Copié !</span>
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

export default CallLink;
