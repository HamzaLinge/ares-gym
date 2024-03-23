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
import { CustomError } from "../../types/global.type";
import CommandModel, { ICommand } from "../../models/Command";
import DiscountModel, { IDiscount } from "../../models/Discount";
import SupplementModel, { ISupplement } from "../../models/Supplement";
import { capitalize } from "../../utils/string.util";
import { HttpStatusCodes } from "../../utils/error.util";
import { Roles } from "../authentication/auth.type";
import PaymentModel, { IPayment } from "../../models/Payment";

export async function command_post_controller(
  req: Request<any, any, IRequest_command_post>,
  res: Response<IResponse_command_post>,
  next: NextFunction,
) {
  let commandInputs: Partial<ICommand> = {
    shipping: req.body.shipping,
  };
  let paymentInputs: Partial<IPayment> = {
    method: req.body.payment.method,
    amount: 0,
  };

  if (!req.body.supplements || req.body.supplements.length === 0) {
    return next(
      new CustomError(
        `There are no supplements provided`,
        HttpStatusCodes.BAD_REQUEST,
      ),
    );
  }
  for (let i = 0; i < req.body.supplements.length; i++) {
    const supplement: ISupplement | null = await SupplementModel.findById(
      req.body.supplements[i].data,
    );
    if (!supplement) {
      return next(
        new CustomError(
          `Supplement not found for id: ${req.body.supplements[i].data}`,
          HttpStatusCodes.NOT_FOUND,
        ),
      );
    }
    if (req.body.supplements[i].quantity > supplement.stock) {
      return next(
        new CustomError(
          `${capitalize(supplement.name)} quantity required exceeds the stock`,
          HttpStatusCodes.CONFLICT,
        ),
      );
    }
    paymentInputs.amount = (paymentInputs.amount || 0) + supplement.price;
  }

  commandInputs.supplements = req.body.supplements;

  if (req.body.discount) {
    const discount: IDiscount | null = await DiscountModel.findById(
      req.body.discount,
    );
    if (!discount) {
      return next(
        new CustomError("Discount not found", HttpStatusCodes.NOT_FOUND),
      );
    }
    const dateNow = new Date();
    const dateBegin = new Date(discount.dateBegin);
    const dateEnd = new Date(discount.dateEnd);
    if (dateNow < dateBegin || dateNow > dateEnd) {
      return next(
        new CustomError(
          "Discount is either expired or not yet valid",
          HttpStatusCodes.CONFLICT,
        ),
      );
    }
    commandInputs.discount = req.body.discount;
    paymentInputs.amount =
      (paymentInputs.amount as number) * discount.percentage;
  }

  if (req.body.note) {
    commandInputs.note = req.body.note;
  }

  // console.log({ commandInputs });
  const createdCommand: ICommand = await CommandModel.create(commandInputs);
  paymentInputs.command = createdCommand._id;
  // console.log({ paymentInputs });
  await PaymentModel.create(paymentInputs);

  res.status(HttpStatusCodes.CREATED).send({ command: createdCommand });
}

export async function command_get_controller(
  req: Request<any, any, any, IRequest_command_get>,
  res: Response<IResponse_command_get>,
  next: NextFunction,
) {
  if (req.query.idCommand) {
    const command: ICommand | null = await CommandModel.findOne({
      _id: req.query.idCommand,
    })
      .populate<{ "supplements.data": ISupplement }>({
        path: "supplements.data",
      })
      .populate<{ discount: IDiscount }>({ path: "discount" });
    if (!command) {
      next(
        new CustomError(
          "There is no command found with this id",
          HttpStatusCodes.NOT_FOUND,
        ),
      );
    } else {
      res.status(HttpStatusCodes.OK).send({ command });
    }
  } else {
    const filter =
      req.user?.role === Roles.subscriber ? { user: req.user._id } : {};
    const commands: ICommand[] = await CommandModel.find(filter)
      // .populate<{ "supplements.data": ISupplement }>({
      //   path: "supplements.data",
      // })
      // .populate<{ discount: IDiscount }>({ path: "discount" })
      .sort({ updatedAt: -1 });
    if (commands.length === 0) {
      next(
        new CustomError(
          "There are no commands found",
          HttpStatusCodes.NOT_FOUND,
        ),
      );
    } else {
      res.status(HttpStatusCodes.OK).send({ commands });
    }
  }
}

export async function command_put_controller(
  req: Request<IRequest_command_put_params, any, IRequest_command_put_body>,
  res: Response<IResponse_command_put>,
  next: NextFunction,
) {
  const commandExists: ICommand | null = await CommandModel.findById(
    req.params.idCommand,
  );
  if (!commandExists) {
    return next(
      new CustomError("There is no command found", HttpStatusCodes.NOT_FOUND),
    );
  }
  if (req.body.supplements) {
    for (let i = 0; i < req.body.supplements.length; i++) {
      const supplement: ISupplement | null = await SupplementModel.findById(
        req.body.supplements[i].data,
      );
      if (!supplement) {
        return next(
          new CustomError(
            `Supplement not found with id: ${req.body.supplements[i].data}`,
            HttpStatusCodes.NOT_FOUND,
          ),
        );
      } else if (req.body.supplements[i].quantity > supplement.stock) {
        return next(
          new CustomError(
            `${capitalize(supplement.name)} quantity exceeds the stock`,
            HttpStatusCodes.CONFLICT,
          ),
        );
      }
    }
  }
  const updatedCommand: ICommand | null = await CommandModel.findOneAndUpdate(
    { _id: req.params.idCommand },
    req.body,
    { new: true },
  );
  // .populate<{ "supplements.data": ISupplement }>({
  //   path: "supplements.data",
  // })
  // .populate<{ discount: IDiscount }>({ path: "discount" });
  if (!updatedCommand) {
    next(
      new CustomError("Updated Command not found", HttpStatusCodes.NOT_FOUND),
    );
  } else {
    res.status(HttpStatusCodes.OK).send({ command: updatedCommand });
  }
}

export async function command_delete_controller(
  req: Request<IRequest_command_delete>,
  res: Response<IResponse_command_delete>,
  next: NextFunction,
) {
  const commandExists: ICommand | null = await CommandModel.findById(
    req.params.idCommand,
  );
  if (!commandExists) {
    next(
      new CustomError(
        "There is no command found to delete",
        HttpStatusCodes.NOT_FOUND,
      ),
    );
  } else {
    await CommandModel.findOneAndDelete({ _id: commandExists._id });
    res
      .status(HttpStatusCodes.OK)
      .send({ idDeletedCommand: commandExists._id });
  }
}
