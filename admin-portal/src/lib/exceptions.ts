import { IErrorAPI } from "@/utils/global-types";

export class CustomClassErrorApi extends Error {
  constructor(errorApi: IErrorAPI) {
    super(errorApi.error.message);
    this.name = "Error API";
  }
}
