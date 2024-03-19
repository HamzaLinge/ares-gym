import { Document, PopulatedDoc, Types } from "mongoose";

import { CommandStatus, ICommand } from "../../models/Command";
import { ISupplement } from "../../models/Supplement";
import { PaymentMethod } from "../../models/Payment";

// Supplement Property for Command --------------------------------------------------------------------------------
export type SupplementObject = {
  data: PopulatedDoc<Document<Types.ObjectId> & ISupplement>;
  quantity: number;
};

/**
  POST: /command/
 */
export interface IRequest_command_post {
  supplements: SupplementObject[];
  shipping: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    wilaya: string;
    address: string;
    dateShipped?: Date;
  };
  payment: { method: PaymentMethod };
  discount?: string;
  note?: string;
}
export interface IResponse_command_post {
  command: ICommand;
}

/**
 GET: /command/
 */
export interface IRequest_command_get {
  idCommand?: string;
}
interface IResponse_command_getOne {
  command: ICommand;
}
interface IResponse_command_getAll {
  commands: ICommand[];
}
export type IResponse_command_get =
  | IResponse_command_getOne
  | IResponse_command_getAll;

/**
 PUT: /command/:idCommand
 */
export interface IRequest_command_put_params {
  idCommand?: string;
}
export interface IRequest_command_put_body {
  supplements?: SupplementObject[];
  discount?: string;
  status?: CommandStatus;
  shippedAddress?: String;
  dateShipped?: Date;
  dateDelivered?: Date;
  canceled?: { date: Date; reason?: string };
  note?: string;
}
export interface IResponse_command_put {
  command: ICommand;
}

/**
 DELETE: /command/:idCommand
 */
export interface IRequest_command_delete {
  idCommand?: string;
}
export interface IResponse_command_delete {
  idDeletedCommand: string;
}
