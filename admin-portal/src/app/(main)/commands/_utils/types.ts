import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import { TDiscount } from "@/app/(main)/discounts/_utils/types";

export enum CommandStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export type TSupplementObject = {
  data: string | ISupplement;
  quantity: number;
};

export type TCommand = {
  _id: string;
  user: string;
  supplements: TSupplementObject[];
  status: CommandStatus;
  discount?: string | TDiscount;
  shippedAddress?: string;
  dateShipped?: Date;
  dateDelivered?: Date;
  trackingNumber?: string;
  note?: string;
  canceled?: { date: Date; reason?: string };
  createdAt?: Date;
  updatedAt?: Date;
};
