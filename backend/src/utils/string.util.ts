export const capitalize = (name: string): string => {
  const parts = name.split(" ");
  const strArr: string[] = [];
  parts.forEach((p) => {
    strArr.push(p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
  });
  return strArr.join(" ");
};

export const notEmptyString = (value: string | any) => {
  return typeof value === "string" && value.trim()! == "";
};
