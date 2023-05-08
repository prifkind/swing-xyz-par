import { IResponseRoute } from "../../services/IResponseRoute";

export interface ITransactionStatusProps {
  allowance: number | string;
  formFields: any;
  quote: IResponseRoute;
  setAllowance: (allowance: number | string) => void;
}
