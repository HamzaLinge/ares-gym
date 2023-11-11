import { NextFunction, Request, Response } from "express";

import { Roles } from "../../../types/common.types";

export async function weightlifting_asset_create_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user)
      return res.status(404).send({
        success: false,
        message:
          "There is no user found to check the permission for this request",
      });
    if (user.role === Roles.admin) return next();
    return res.status(401).send({
      success: false,
      message: "You do not have the permission to create a weightlifting asset",
    });
  } catch (errPermission) {
    console.log(
      `Something went wrong during checking permissions for create weightlifting asset => ${errPermission}`
    );
    return res.status(500).send({
      success: false,
      message:
        "Something went wrong during checking permissions for create weightlifting asset",
    });
  }
}

export async function weightlifting_asset_get_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user)
      return res.status(404).send({
        success: false,
        message:
          "There is no user found to check the permission for this request",
      });
    if (user.role === Roles.admin) return next();
    return res.status(401).send({
      success: false,
      message: "You do not have the permission to get weightlifting asset",
    });
  } catch (errPermission) {
    console.log(
      `Something went wrong during checking permissions for get weightlifting asset => ${errPermission}`
    );
    return res.status(500).send({
      success: false,
      message:
        "Something went wrong during checking permissions for get weightlifting asset",
    });
  }
}
