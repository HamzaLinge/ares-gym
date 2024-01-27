import { IErrorAPI } from "@/utils/global-types";

export class ClassErrorApi extends Error {
  constructor(errorApi: IErrorAPI) {
    super(errorApi.error.message);
    this.name = "Error API";
  }
}
