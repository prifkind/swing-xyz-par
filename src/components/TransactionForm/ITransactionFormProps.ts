import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { IResponseRoute } from "../../services/IResponseRoute";

export interface ITransactionFormProps {
  formData: IGetQuoteParams;
  processing: boolean;
  setAllowance: (allowance: number) => void;
  setFormData: (callback: (prevState: IGetQuoteParams) => IGetQuoteParams) => void;
  setProcessing: (processing: boolean) => void;
  setQuote: (quote: IResponseRoute) => void;
  setStale: (stale: boolean) => void;
  setTxInitiated: ( txInitiated: boolean) => void;
}
