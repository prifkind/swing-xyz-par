import { IReduxState } from "../../redux/IReduxState";
import { IFormDataProps } from "../TransactionStatus/IFormDataProps";

export interface IQuoteProps extends IReduxState{
  formData: IFormDataProps;
  getAllowance: (formData: IFormDataProps, routes: any) => any;
  processing: boolean;
  routes: Array<any>;
  setFormData: (formFields: IFormDataProps) => void;
  setProcessing: (processing: boolean) => void;
  setSelectedRoute: (route: any, amount: string) => any;
  setTxInitiated: (txInitiated: boolean) => void;
  stale: boolean;
  txInitiated: boolean;
}
