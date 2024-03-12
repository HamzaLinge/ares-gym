import { IRequest_supplement_get } from "../features/supplement/supplement.type";

export function filterObj(obj: { [key: string]: any }) {
  const arr = Object.entries(obj);
  const filteredArr = arr.filter(
    ([key, value]) => value !== "" && key[0] !== "$",
  );
  return Object.fromEntries(filteredArr);
}

export function parseQueryParams(query: IRequest_supplement_get) {
  let filter: {
    price?: { $gte?: number; $lte?: number };
    category?: string;
    _id?: { $ne: string };
  } = {};

  // let sortBy: { updatedAt?: 1 | -1; price?: 1 | -1 } = {};
  let sortBy: { [key: string]: 1 | -1 } = {};

  // Ensuring skip and limit are integers and within reasonable bounds
  const skip = Math.max(0, query.skip || 0);
  const limit = Math.min(Math.max(1, query.limit || 10), 100); // Limits between 1 and 100

  for (const [key, value] of Object.entries(query)) {
    switch (key) {
      case "minPrice":
        filter.price = { ...filter?.price, $gte: value };
        break;
      case "maxPrice":
        filter.price = { ...filter?.price, $lte: value };
        break;
      case "category":
        filter.category = value;
        break;
      case "sortBy":
        if (typeof value !== "string") break;
        const sortFields = value.split(",");
        sortFields.forEach((field) => {
          const [name, order = "asc"] = field.split("-");
          sortBy[name] = order === "desc" ? -1 : 1;
        });
        break;
      case "excludeId":
        filter._id = { $ne: value };
        break;
    }
  }
  return { filter, sortBy, skip, limit };
}
