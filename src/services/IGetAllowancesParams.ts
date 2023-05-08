import { IResponseRoute } from "./IResponseRoute";
import { IGetQuoteParams } from "./IGetQuoteParams";

export interface IGetAllowancesParams {
  formFields: IGetQuoteParams;
  quote: IResponseRoute;
}
