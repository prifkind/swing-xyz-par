import { IResponseRoute } from "../../services/IResponseRoute";

export interface IQuoteProps {
  allowance: number | string;
  formFields: any;
  processing: boolean;
  quote: IResponseRoute;
  setAllowance: (allowance: number | string) => void;
  setTxInitiated: (txInitiated: boolean) => void;
  stale: boolean;
  txInitiated: boolean;
}
