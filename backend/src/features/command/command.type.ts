import { ProteinObject } from "../../types/common.types";
import { ICommand } from "../../models/Commands";

/**
  POST: /shopping/command/
 */
export interface IRequest_shopping_command_post {
  proteins: ProteinObject[];
  discount?: {
    data: string;
  };
  note?: string;
}
export interface IResponse_shopping_command_post {
  command: ICommand;
}

/**
 GET: /shopping/command/
 */
export interface IRequest_shopping_command_get {
  idCommand?: string;
  confirmed?: boolean;
}
interface IResponse_shopping_command_getOne {
  command: ICommand;
}
interface IResponse_shopping_command_getAll {
  commands: ICommand[];
}
export type IResponse_shopping_command_get =
  | IResponse_shopping_command_getOne
  | IResponse_shopping_command_getAll;

/**
 PUT: /shopping/command/:idCommand
 */
export interface IRequest_shopping_command_put_params {
  idCommand?: string;
}
export interface IRequest_shopping_command_put_body {
  proteins?: ProteinObject[];
  discount?: {
    data?: string;
  };
  note?: string;
}
export interface IResponse_shopping_command_put {
  command: ICommand;
}

/**
 PUT: /shopping/command/confirm/:idCommand
 */
export interface IRequest_shopping_command_confirm_put {
  idCommand?: string;
}
export interface IResponse_shopping_command_confirm_put {
  command: ICommand;
}

/**
 PUT: /shopping/command/discount/files/:idCommand
 */
export interface IRequest_shopping_command_discount_files_put {
  idCommand?: string;
}
export interface IResponse_shopping_command_discount_files_put {
  command: ICommand;
}

/**
 DELETE: /shopping/command/:idCommand
 */
export interface IRequest_shopping_command_delete {
  idCommand?: string;
}
export interface IResponse_shopping_command_delete {
  idCommandDeleted: string;
}

/**
 DELETE: /shopping/command/discount/file/:idCommand/:idDiscountFile
 */
export interface IRequest_shopping_command_discount_file_delete {
  idCommand?: string;
  idDiscountFile?: string;
}
export interface IResponse_shopping_command_discount_file_delete {
  command: ICommand;
}
