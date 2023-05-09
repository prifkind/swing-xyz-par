import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { IResponseRoute } from "../../services/IResponseRoute";

export interface ITransactionStatusProps {
  allowance: number | string;
  formData: IGetQuoteParams;
  quote: IResponseRoute;
  setAllowance: (allowance: number | string) => void;
  setTxInitiated: (txInitiated: boolean) => void;
}
