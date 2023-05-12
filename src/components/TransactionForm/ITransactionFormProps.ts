import { IReduxState } from "../../redux/IReduxState";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";

export interface ITransactionFormProps extends IReduxState {
  getQuote: (formData: IGetQuoteParams) => any;
  postFormData: (formData: IGetQuoteParams) => void;
  processing: boolean;
  setAllowance: (allowance: number) => void;
  setProcessing: (processing: boolean) => void;
  setStale: (stale: boolean) => void;
  setTxInitiated: (txInitiated: boolean) => void;
  connectWallet: () => any;
}
