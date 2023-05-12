import { IQuote } from "./IQuote";
import { IGetQuoteParams } from "./IGetQuoteParams";

export interface IGetAllowancesParams {
  formFields: IGetQuoteParams;
  quote: IQuote;
}
