import { IReduxState } from "../../redux/IReduxState";
import { IFormDataProps } from "../TransactionStatus/IFormDataProps";

export interface ITransactionFormProps extends IReduxState {
  getQuote: (formData: IFormDataProps) => any;
  postFormData: (formData: IFormDataProps) => void;
  processing: boolean;
  setAllowance: (allowance: number) => void;
  setProcessing: (processing: boolean) => void;
  setStale: (stale: boolean) => void;
  setTxInitiated: (txInitiated: boolean) => void;
  connectWallet: () => any;
}
