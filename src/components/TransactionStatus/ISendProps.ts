import { IFormDataProps } from "./IFormDataProps";

export interface ISendProps {
  approveTokenAndPostTransaction: (
    formData: IFormDataProps,
    route: any,
  ) => any;
  formData: IFormDataProps;
  processing: boolean;
  route: any;
  setProcessing: (processing: boolean) => void;
}
