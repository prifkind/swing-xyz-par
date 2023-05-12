import { IGetQuoteParams } from "../../services/IGetQuoteParams";

export interface ISendProps {
  approveTokenAndPostTransaction: (
    formData: IGetQuoteParams,
    route: any,
  ) => any;
  formData: IGetQuoteParams;
  processing: boolean;
  route: any;
  setProcessing: (processing: boolean) => void;
}
