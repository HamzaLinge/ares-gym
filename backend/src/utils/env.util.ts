export function getEnv(variable_name: string) {
  const value = process.env[variable_name];
  if (typeof value === "undefined" || value === "") {
    throw new Error(`${variable_name} is not set`);
  }
  return value;
}
