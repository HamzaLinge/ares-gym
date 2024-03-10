import { IRequest_supplement_get } from "../features/supplement/supplement.type";

export function filterObj(obj: { [key: string]: any }) {
  const arr = Object.entries(obj);
  const filteredArr = arr.filter(
    ([key, value]) => value !== "" && key[0] !== "$",
  );
  return Object.fromEntries(filteredArr);
}

export function getFilterAndSortBy(query: IRequest_supplement_get) {
  let filter: {
    price?: { $gte?: number; $lte?: number };
    category?: string;
  } = {};
  let sortBy: { updatedAt?: 1 | -1; price?: 1 | -1 } = {};
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
        switch (value) {
          case "updatedAt":
            sortBy.updatedAt = -1;
            break;
          case "price":
            sortBy.price = 1;
            break;
          case "price-desc":
            sortBy.price = -1;
        }
    }
  }
  return { filter, sortBy };
}
