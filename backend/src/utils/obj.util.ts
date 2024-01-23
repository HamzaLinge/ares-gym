export function filterObj(obj: { [key: string]: any }) {
  const arr = Object.entries(obj);
  const filteredArr = arr.filter(
    ([key, value]) => value !== "" && key[0] !== "$"
  );
  return Object.fromEntries(filteredArr);
}
