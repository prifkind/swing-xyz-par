import { IReduxState } from "../../redux/IReduxState";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";

export interface IQuoteProps extends IReduxState{
  formData: IGetQuoteParams;
  getAllowance: (formData: IGetQuoteParams, routes: any) => any;
  processing: boolean;
  routes: Array<any>;
  setFormData: (formFields: IGetQuoteParams) => void;
  setSelectedRoute: (route: any) => any;
  setTxInitiated: (txInitiated: boolean) => void;
  stale: boolean;
  txInitiated: boolean;
}
