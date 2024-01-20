"use client";

import React, { ElementType, ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/FormError";

interface IFormModalProps {
  children: ReactNode;
  Icon: ElementType;
  action: any;
  // action: (state: Awaited<State>, payload?: Payload) => State | Promise<State>;
}

export default function FormModal({ children, Icon, action }: IFormModalProps) {
  const refModalDialog = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Icon
        className={
          "h-7 w-7 rounded-full p-1 text-error hover:cursor-pointer hover:bg-error hover:bg-opacity-25"
        }
        onClick={() => refModalDialog.current.showModal()}
      />
      <dialog
        role={"dialog"}
        className={
          "z-10 w-full rounded border-none backdrop:bg-black backdrop:bg-opacity-50"
        }
        ref={refModalDialog}
      >
        <form
          action={action}
          className={"flex flex-col items-center gap-y-10 bg-bg-200 p-4 pb-10"}
        >
          <h1>Warning Deletion!</h1>
          <div className={"relative w-full"}>
            <div
              className={
                "relative flex w-full items-center justify-center gap-x-4"
              }
            >
              <Button type={"submit"} className={"w-1/3"}>
                I'm sure
              </Button>
              <Button
                variant={"outline"}
                className={"absolute right-0"}
                onClick={() => refModalDialog.current.close()}
                type={"reset"}
                formNoValidate={true}
                aria-label="Cancel"
              >
                Cancel
              </Button>
            </div>
            <FormError withIcon>
              <p>{stateAlertCategory.error?.message}</p>
            </FormError>
          </div>
        </form>
      </dialog>
    </div>
  );
}
