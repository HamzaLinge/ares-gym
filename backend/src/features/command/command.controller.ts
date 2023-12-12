import { NextFunction, Request, Response } from "express";

import {
  IRequest_command_delete,
  IRequest_command_get,
  IRequest_command_post,
  IRequest_command_put_body,
  IRequest_command_put_params,
  IResponse_command_delete,
  IResponse_command_get,
  IResponse_command_post,
  IResponse_command_put,
} from "./command.type";
import { CustomError } from "../../types/common.type";
import { deleteFile } from "../../utils/deleteFile";
import CommandModel, { ICommand } from "../../models/Commands";
import DiscountModel, { IDiscount } from "../../models/Discount";
import ProteinModel, { IProtein } from "../../models/Protein";
import { capitalize } from "../../utils/capitalize";

export async function command_post_controller(
  req: Request<any, any, IRequest_command_post>,
  res: Response<IResponse_command_post>,
  next: NextFunction
) {
  let inputCommand: any = {};
  inputCommand.user = req.user?._id;
  if (req.body.discount) {
    const discount: IDiscount | null = await DiscountModel.findById(
      req.body.discount
    );
    if (!discount) {
      return next(new CustomError("Discount not found", 404));
    }
    const dateNow = new Date();
    const dateBegin = new Date(discount.dateBegin);
    const dateEnd = new Date(discount.dateEnd);
    if (dateNow < dateBegin || dateNow > dateEnd) {
      return next(
        new CustomError("Discount is either expired or not yet valid", 422)
      );
    }
  }
  for (let i = 0; i < req.body.proteins.length; i++) {
    const protein: IProtein | null = await ProteinModel.findById(
      req.body.proteins[i].data
    );
    if (!protein) {
      return next(
        new CustomError(
          `Protein found to command with id: ${req.body.proteins[i].data}`,
          404
        )
      );
    } else if (req.body.proteins[i].quantity > protein.stock) {
      return next(
        new CustomError(
          `${capitalize(protein.name)} Protein Quantity exceeds the stock`,
          422
        )
      );
    }
  }
  inputCommand = { ...req.body };
  const createdCommand: ICommand = await CommandModel.create(inputCommand);
  const command: ICommand | null = await CommandModel.findById(
    createdCommand._id
  )
    .populate<{ "proteins.*.data": IProtein }>({ path: "proteins.*.data" })
    .populate<{ discount: IDiscount }>({ path: "discount" });
  if (!command) {
    return next(new CustomError("Created Discount not found", 404));
  }
  res.status(200).send({ command });
}

export async function command_get_controller(
  req: Request<any, any, any, IRequest_command_get>,
  res: Response<IResponse_command_get>,
  next: NextFunction
) {
  if (req.query.idCommand) {
    const command: ICommand | null = await CommandModel.findOne({
      _id: req.query.idCommand,
      user: req.user?._id,
    })
      .populate<{ "proteins.*.data": IProtein }>({ path: "proteins.*.data" })
      .populate<{ discount: IDiscount }>({ path: "discount" });
    if (!command) {
      next(new CustomError("There is no command found for this id", 404));
    } else {
      res.status(200).send({ command });
    }
  } else {
    let confirmedFilter: { status: { confirmed: boolean } };
    if (req.query.confirmed) {
      confirmedFilter = { status: { confirmed: req.query.confirmed } };
    }
    const commands: ICommand[] = await CommandModel.find({
      user: req.user?._id,
      status: req.query.confirmed ? { confirmed: req.query.confirmed } : {},
    })
      .populate<{ "proteins.*.data": IProtein }>({ path: "proteins.*.data" })
      .populate<{ discount: IDiscount }>({ path: "discount" })
      .sort({ updatedAt: -1 });
    if (commands.length === 0) {
      next(new CustomError("There are no commands found", 404));
    } else {
      res.status(200).send({ commands: commands });
    }
  }
}

export async function command_put_controller(
  req: Request<IRequest_command_put_params, any, IRequest_command_put_body>,
  res: Response<IResponse_command_put>,
  next: NextFunction
) {
  const commandExists: ICommand | null = await CommandModel.findById(
    req.params.idCommand
  );
  if (!commandExists) {
    return next(new CustomError("There is no command found to edit", 404));
  }
  if (req.body.proteins) {
    for (let i = 0; i < req.body.proteins.length; i++) {
      const protein: IProtein | null = await ProteinModel.findById(
        req.body.proteins[i].data
      );
      if (!protein) {
        return next(
          new CustomError(
            `Protein found with id: ${req.body.proteins[i].data}`,
            404
          )
        );
      } else if (req.body.proteins[i].quantity > protein.stock) {
        return next(
          new CustomError(
            `${capitalize(protein.name)} Quantity exceeds the stock`,
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
  )
    .populate<{ "proteins.*.data": IProtein }>({ path: "proteins.*.data" })
    .populate<{ discount: IDiscount }>({ path: "discount" });
  if (!updatedCommand) {
    next(new CustomError("Updated Command not found", 404));
  } else {
    res.status(200).send({ command: updatedCommand });
  }
}

export async function command_delete_controller(
  req: Request<IRequest_command_delete>,
  res: Response<IResponse_command_delete>,
  next: NextFunction
) {
  const commandExists: ICommand | null = await CommandModel.findById(
    req.params.idCommand
  );
  if (!commandExists) {
    next(new CustomError("There is no command found to delete", 404));
  } else {
    await CommandModel.findOneAndDelete({ _id: commandExists._id });
    res.status(200).send({ idCommandDeleted: commandExists._id });
  }
}
