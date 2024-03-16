import { SelectGroup, SelectItem } from "@/components/ui/select";
import { ICategoryTree } from "@/types/category";
import { TLinkNavigation } from "@/types/ui";

function formatCategoryNodeToCategoryLink(
  category: ICategoryTree,
): TLinkNavigation {
  let formattedCategory = {
    label: category.name,
    path: `/shop?category=${category._id}`,
  };
  if (!category.children || category.children.length === 0) {
    return formattedCategory;
  } else {
    return {
      ...formattedCategory,
      children: category.children?.map((cat) => {
        return formatCategoryNodeToCategoryLink(cat);
      }),
    };
  }
}

export const mapCategoryLinks = ({
  categoryTree,
}: {
  categoryTree: ICategoryTree[];
}) => {
  const categoryNodes = categoryTree
    // .filter((cat, index) => !cat.children || cat.children.length === 0)
    .map((category) => formatCategoryNodeToCategoryLink(category));

  return categoryNodes;
};

type TSelectOption = {
  value: string;
  label: string;
  children?: TSelectOption[];
};

export const renderCategoryOptions = (
  options: TSelectOption[],
): React.ReactNode => {
  return options.map((option) => {
    if (option.children && option.children.length > 0) {
      return (
        <SelectGroup key={option.value}>
          <SelectItem value={option.value}>{option.label}</SelectItem>
          <SelectGroup className={"pl-2"}>
            {renderCategoryOptions(option.children)}
          </SelectGroup>
        </SelectGroup>
      );
    } else {
      return (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      );
    }
  });
};

export function transformCategoryTreeToSelectOption(
  category: ICategoryTree,
): TSelectOption {
  return {
    value: category._id,
    label: category.name,
    children: category.children?.map(transformCategoryTreeToSelectOption),
  };
}

export const createQueryURL = (
  input: Partial<Record<string, string | number>>,
  pathname: string = "",
) => {
  if (Object.keys(input).length === 0 && pathname.length === 0) return "?";
  return Object.entries(input).reduce((accumulator, currentValue) => {
    if (!currentValue[1]) return accumulator;
    const hasQueryParams = /\?.+/;
    if (hasQueryParams.test(accumulator)) {
      return accumulator + `&${currentValue[0]}=${currentValue[1]}`;
    }
    return accumulator + `?${currentValue[0]}=${currentValue[1]}`;
  }, pathname);
};

export function getFileUrl(
  idFile: string | string[] | undefined,
  index: number = 0,
) {
  const baseURL =
    process.env.BASE_URL !== undefined
      ? process.env.BASE_URL
      : process.env.NEXT_PUBLIC_BASE_URL;
  if (typeof idFile === "string") return `${baseURL}/file/${idFile}`;
  if (
    Array.isArray(idFile) &&
    idFile.length > 0 &&
    typeof idFile[0] === "string"
  )
    return `${baseURL}/file/${idFile[index]}`;
  return "/default-supplement-thumbnail.jpg";
}

export const formatPrice = (
  price: number,
  currency = "DZD",
  locale = "fr-DZ",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol", // Options are "symbol", "narrowSymbol", "code", or "name"
  }).format(price);
};
