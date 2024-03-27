import { IconType } from "react-icons/lib";

export type TLinkNavigation = {
  Icon: IconType;
  label: string;
  path: string;
  children?: TLinkNavigation[];
};
