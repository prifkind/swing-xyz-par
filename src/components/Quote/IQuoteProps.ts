import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { IResponseRoute } from "../../services/IResponseRoute";

export interface IQuoteProps {
  allowance: number | string;
  formData: IGetQuoteParams;
  processing: boolean;
  quote: IResponseRoute;
  setAllowance: (allowance: number | string) => void;
  setFormData: (formFields: IGetQuoteParams) => void;
  setTxInitiated: (txInitiated: boolean) => void;
  stale: boolean;
  txInitiated: boolean;
}
