import { ProteinObject } from "../../types/common.type";
import { ICommand } from "../../models/Commands";

/**
  POST: /command/
 */
export interface IRequest_command_post {
  proteins: ProteinObject[];
  discount?: {
    data: string;
  };
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
  confirmed?: boolean;
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
  proteins?: ProteinObject[];
  discount?: {
    data?: string;
  };
  note?: string;
}
export interface IResponse_command_put {
  command: ICommand;
}

/**
 PUT: /command/confirm/:idCommand
 */
export interface IRequest_command_confirm_put {
  idCommand?: string;
}
export interface IResponse_command_confirm_put {
  command: ICommand;
}

/**
 PUT: /command/discount/files/:idCommand
 */
export interface IRequest_command_discount_files_put {
  idCommand?: string;
}
export interface IResponse_command_discount_files_put {
  command: ICommand;
}

/**
 DELETE: /command/:idCommand
 */
export interface IRequest_command_delete {
  idCommand?: string;
}
export interface IResponse_command_delete {
  idCommandDeleted: string;
}

/**
 DELETE: /command/discount/file/:idCommand/:idDiscountFile
 */
export interface IRequest_command_discount_file_delete {
  idCommand?: string;
  idDiscountFile?: string;
}
export interface IResponse_command_discount_file_delete {
  command: ICommand;
}
