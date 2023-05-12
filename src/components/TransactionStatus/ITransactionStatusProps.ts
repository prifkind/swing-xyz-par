import { IReduxState } from "../../redux/IReduxState";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { IQuote } from "../../services/IQuote";

export interface ITransactionStatusProps extends IReduxState {
  formData: IGetQuoteParams;
  postTransaction: (formData: IGetQuoteParams, quote: IQuote) => any
  quote: IQuote;
  setTxInitiated: (txInitiated: boolean) => void;
}
