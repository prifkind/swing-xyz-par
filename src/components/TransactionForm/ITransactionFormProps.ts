import { IResponseRoute } from "../../services/IResponseRoute";

export interface ITransactionFormProps {
  processing: boolean;
  setFormFields: (formFields: any) => void;
  setProcessing: (processing: boolean) => void;
  setQuote: (quote: IResponseRoute) => void;
}
