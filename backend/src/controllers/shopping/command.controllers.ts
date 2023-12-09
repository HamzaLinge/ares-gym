import { NextFunction, Request, Response } from "express";

import {
  IRequest_shopping_command_confirm_put,
  IRequest_shopping_command_delete,
  IRequest_shopping_command_discount_files_put,
  IRequest_shopping_command_get,
  IRequest_shopping_command_post,
  IRequest_shopping_command_put_body,
  IRequest_shopping_command_put_params,
  IResponse_shopping_command_confirm_put,
  IResponse_shopping_command_delete,
  IResponse_shopping_command_get,
  IResponse_shopping_command_post,
  IResponse_shopping_command_put,
  IResponse_shopping_command_discount_files_put,
  IRequest_shopping_command_discount_file_delete,
  IResponse_shopping_command_discount_file_delete,
} from "../../types/shopping/command.types";
import { CustomError } from "../../types/common.types";
import { deleteFile } from "../../utils/deleteFile";
import CommandModel, { ICommand } from "../../models/Commands";
import { IDiscount } from "../../models/Discount";
import ProteinModel, { IProtein } from "../../models/Protein";
import { capitalize } from "../../utils/capitalize";

export async function shopping_command_post_controller(
  req: Request<any, any, IRequest_shopping_command_post>,
  res: Response<IResponse_shopping_command_post>,
  next: NextFunction
) {
  let inputCommand: any = {};
  inputCommand.user = req.user?._id;
  if (req.body.discount && req.fileIdArr) {
    const files: string[] = [];
    req.fileIdArr.forEach((fileId) => files.push(fileId));
    inputCommand.discount.files = files;
  } else if (!req.body.discount && req.fileIdArr) {
    req.fileIdArr.forEach((fileId) => deleteFile(fileId));
    next(
      new CustomError("You need to provide a Discount along with the files", 4)
    );
  } else {
    for (let i = 0; i < req.body.proteins.length; i++) {
      const protein: IProtein | null = await ProteinModel.findById(
        req.body.proteins[i].data
      );
      if (!protein) {
        next(
          new CustomError(
            `There is no Protein found for id: ${req.body.proteins[i].data}`,
            404
          )
        );
      } else if (req.body.proteins[i].quantity > protein.stock) {
        next(
          new CustomError(
            `${capitalize(protein.name)} Protein Quantity exceeds the stock`,
            422
          )
        );
      }
    }
    inputCommand = { ...req.body };
    const command: ICommand = await CommandModel.create(inputCommand);
    res.status(200).send({ command });
  }
}

export async function shopping_command_get_controller(
  req: Request<any, any, any, IRequest_shopping_command_get>,
  res: Response<IResponse_shopping_command_get>,
  next: NextFunction
) {
  let commandFilter: any = {};
  if (req.query.confirmed) {
    commandFilter = { status: { confirmed: req.query.confirmed } };
  }
  if (req.query.idCommand) {
    const command: ICommand | null = await CommandModel.findOne({
      _id: req.query.idCommand,
      user: req.user?._id,
      ...commandFilter,
    })
      .populate<{ "proteins.*.data": IProtein }>({ path: "proteins.*.data" })
      .populate<{ "discount.data": IDiscount }>({ path: "discount.data" });
    if (!command) {
      next(new CustomError("There is no command found for this id", 404));
    } else {
      res.status(200).send({ command });
    }
  } else {
    const commands: ICommand[] = await CommandModel.find({
      user: req.user?._id,
      ...commandFilter,
    })
      .populate<{ "proteins.*.data": IProtein }>({ path: "proteins.*.data" })
      .populate<{ "discount.data": IDiscount }>({ path: "discount.data" })
      .sort({ updatedAt: -1 });
    if (commands.length === 0) {
      next(new CustomError("There are no commands found", 404));
    } else {
      res.status(200).send({ commands: commands });
    }
  }
}

export async function shopping_command_put_controller(
  req: Request<
    IRequest_shopping_command_put_params,
    any,
    IRequest_shopping_command_put_body
  >,
  res: Response<IResponse_shopping_command_put>,
  next: NextFunction
) {
  const commandExists: ICommand | null = await CommandModel.findById(
    req.params.idCommand
  );
  if (!commandExists) {
    next(new CustomError("There is no command found to edit", 404));
  } else {
    if (req.body.proteins) {
      for (let i = 0; i < req.body.proteins.length; i++) {
        const protein: IProtein | null = await ProteinModel.findById(
          req.body.proteins[i].data
        );
        if (!protein) {
          next(
            new CustomError(
              `There is no Protein found for id: ${req.body.proteins[i].data}`,
              404
            )
          );
        } else if (req.body.proteins[i].quantity > protein.stock) {
          next(
            new CustomError(
              `${capitalize(protein.name)} Protein Quantity exceeds the stock`,
              422
            )
          );
        }
      }
    }
    const updatedCommand: ICommand | null = await CommandModel.findOneAndUpdate(
      { _id: req.params.idCommand },
      { ...req.body },
      { new: true }
    );
    if (!updatedCommand) {
      next(new CustomError("There is no updated command found", 404));
    } else {
      res.status(200).send({ command: updatedCommand });
    }
  }
}

export async function shopping_command_confirm_put_controller(
  req: Request<IRequest_shopping_command_confirm_put>,
  res: Response<IResponse_shopping_command_confirm_put>,
  next: NextFunction
) {
  const command: ICommand | null = await CommandModel.findById(
    req.params?.idCommand
  );
  if (!command) {
    next(new CustomError("There is no command found to confirm", 404));
  } else {
    const confirmedCommand: ICommand | null =
      await CommandModel.findOneAndUpdate(
        { _id: req.params.idCommand },
        { "status.confirmed": true },
        { new: true }
      );
    if (!confirmedCommand) {
      next(new CustomError("There is no confirmed command found", 404));
    } else {
      res.status(200).send({ command: confirmedCommand });
    }
  }
}

export async function shopping_command_discount_files_put_controller(
  req: Request<IRequest_shopping_command_discount_files_put>,
  res: Response<IResponse_shopping_command_discount_files_put>,
  next: NextFunction
) {
  const commandExists: ICommand | null = await CommandModel.findById(
    req.params.idCommand
  );
  if (!commandExists) {
    next(new CustomError("There is no command found to edit", 404));
  } else {
    const updatedCommand: ICommand | null = await CommandModel.findOneAndUpdate(
      { _id: req.params.idCommand },
      { $push: { "discount.files": { $each: req.fileIdArr } } },
      { new: true }
    );
    if (!updatedCommand) {
      next(new CustomError("There is no updated command found", 404));
    } else {
      res.status(200).send({ command: updatedCommand });
    }
  }
}

export async function shopping_command_delete_controller(
  req: Request<IRequest_shopping_command_delete>,
  res: Response<IResponse_shopping_command_delete>,
  next: NextFunction
) {
  const commandExists: ICommand | null = await CommandModel.findById(
    req.params.idCommand
  );
  if (!commandExists) {
    next(new CustomError("There is no command found to delete", 404));
  } else {
    commandExists.discount?.files?.forEach((fileId) => deleteFile(fileId));
    await CommandModel.findOneAndDelete({ _id: commandExists._id });
    res.status(200).send({ idCommandDeleted: commandExists._id });
  }
}

export async function shopping_command_discount_file_delete_controller(
  req: Request<IRequest_shopping_command_discount_file_delete>,
  res: Response<IResponse_shopping_command_discount_file_delete>,
  next: NextFunction
) {
  let params: { idCommand: string; idDiscountFile: string } = {
    idCommand: "",
    idDiscountFile: "",
  };
  if (req.params.idCommand) params.idCommand = req.params.idCommand;
  if (req.params.idDiscountFile) params.idCommand = req.params.idDiscountFile;
  const commandExists: ICommand | null = await CommandModel.findById(
    params.idCommand
  );
  if (!commandExists) {
    next(new CustomError("There is no command found to delete", 404));
  } else {
    if (!commandExists.discount?.files?.includes(params.idDiscountFile)) {
      next(
        new CustomError(
          "There is no id discount file found to delete for this command",
          422
        )
      );
    } else {
      deleteFile(params.idDiscountFile);
      const updatedCommand: ICommand | null =
        await CommandModel.findOneAndUpdate(
          { _id: params.idCommand },
          { $pull: { "discount.files": params.idDiscountFile } },
          { new: true }
        );
      if (!updatedCommand) {
        next(new CustomError("There is no updated command found", 404));
      } else {
        res.status(200).send({ command: updatedCommand });
      }
    }
  }
}
