import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { isCategory } from "@/utils/helpers";
import { ISupplement } from "../../_utils/types";

type TCardIntoSupplement = Omit<
  ISupplement,
  "thumbnails" | "createdAt" | "updatedAt"
>;

export default function CardInfoSupplement(props: TCardIntoSupplement) {
  const contentItems = [
    {
      label: "Category",
      value: isCategory(props.category) ? props.category.name : "",
    },
    { label: "Price", value: props.price, unit: "DA" },
    { label: "Stock", value: props.stock, unit: "Remaining" },
  ];

  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle className={"capitalize"}>{props.name}</CardTitle>
        {props.description && (
          <CardDescription className={"capitalize font-light"}>
            {props.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className={"flex flex-col gap-y-2"}>
          {contentItems.map(({ label, value, unit }) => (
            <div key={`${label}-${value}`}>
              <p className={"capitalize text-xs italic font-light"}>{label}:</p>
              <p className={"capitalize translate-x-2 border-b"}>
                <span>{value}</span> {unit && <span>{unit}</span>}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
