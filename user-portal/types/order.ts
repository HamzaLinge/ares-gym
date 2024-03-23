import { TSupplement } from "@/types/supplement";

enum CommandStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

type TShippingInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  wilaya: string;
  address: string;
  dateShipped?: Date;
};

export type TCommand = {
  _id: string;
  supplements: { quantity: number; data: string | TSupplement };
  discount?: string;
  status: CommandStatus;
  shipping: TShippingInfo;
  dateDelivered?: Date;
  trackingNumber: string;
  note?: string;
  canceled?: { date: Date; reason?: string };
  createdAt: Date;
  updatedAt: Date;
};
