import { NextFunction, Request, Response } from "express";
import {
  ICategoryTree,
  IRequest_category_delete,
  IRequest_category_get,
  IRequest_category_post,
  IRequest_category_put_body,
  IRequest_category_put_params,
  IResponse_category_delete,
  IResponse_category_get,
  IResponse_category_post,
  IResponse_category_put,
} from "./category.type";
import CategoryModel, { ICategory } from "../../models/Category";
import { CustomError } from "../../types/common.type";
import { buildCategoryTree } from "./category.util";

export async function category_post_controller(
  req: Request<any, any, IRequest_category_post>,
  res: Response<IResponse_category_post>,
  next: NextFunction
) {
  const categoryWithSameName: ICategory | null = await CategoryModel.findOne({
    name: req.body.name,
  });
  if (categoryWithSameName) {
    return next(
      new CustomError("There is already a category with the same name", 422)
    );
  }
  if (req.body.parent) {
    const categoryParentExists: ICategory | null = await CategoryModel.findById(
      req.body.parent
    );
    if (!categoryParentExists) {
      return next(
        new CustomError("Category Parent doesn't exist for the given id", 404)
      );
    }
  }
  const category: ICategory = await CategoryModel.create(req.body);
  res.status(200).send({ category });
}

export async function category_get_controller(
  req: Request<any, any, any, IRequest_category_get>,
  res: Response<IResponse_category_get>,
  next: NextFunction
) {
  const categories: ICategory[] = await CategoryModel.find().sort({ name: 1 });
  let categoryTree = buildCategoryTree(categories);
  if (categoryTree.length === 0) {
    return next(new CustomError("No categories found", 404));
  }
  res.status(200).send({ categoryTree });
}

export async function category_put_controller(
  req: Request<IRequest_category_put_params, any, IRequest_category_put_body>,
  res: Response<IResponse_category_put>,
  next: NextFunction
) {
  const categoryExists: ICategory | null = await CategoryModel.findById(
    req.params.idCategory
  );
  if (!categoryExists) {
    return next(new CustomError("Not Category found to edit", 404));
  }
  if (req.body.name) {
    const categorySameName: ICategory | null = await CategoryModel.findOne({
      name: req.body.name,
    });
    if (categorySameName) {
      return next(
        new CustomError("There already a category with this name", 422)
      );
    }
  }
  if (req.body.parent) {
    const parentExists: ICategory | null = await CategoryModel.findById(
      req.body.parent
    );
    if (!parentExists) {
      return next(new CustomError("Category Parent doesn't exist", 404));
    }
  }
  const updatedCategory = (await CategoryModel.findOneAndUpdate(
    { _id: req.params.idCategory },
    req.body,
    { new: true }
  )) as ICategory;
  res.status(200).send({ category: updatedCategory });
}

export async function category_delete_controller(
  req: Request<IRequest_category_delete>,
  res: Response<IResponse_category_delete>,
  next: NextFunction
) {
  const categoryExists: ICategory | null = await CategoryModel.findById(
    req.params.idCategory
  );
  if (!categoryExists) {
    return next(new CustomError("Not Category found for deleting", 404));
  }
  await CategoryModel.findOneAndDelete({ _id: categoryExists._id });
  res.status(200).send({ deletedIdCategory: categoryExists._id });
}
