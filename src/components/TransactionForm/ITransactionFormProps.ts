import { IResponseRoute } from "../../services/IResponseRoute";

export interface ITransactionFormProps {
  processing: boolean;
  setProcessing: (processing: boolean) => void;
  setQuote: (quote: IResponseRoute) => void;
}
