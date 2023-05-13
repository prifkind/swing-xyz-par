import { IFormDataProps } from "./IFormDataProps";

export interface IApproveProps {
  approving: boolean;
  formData: IFormDataProps;
  metamaskApproval: (
    tokenAddress: string,
    walletAddress: string,
    amountWei: number,
    decimals: number
  ) => any;
  processing: boolean;
  setApproving: (approving: boolean) => void;
  setProcessing: (processing: boolean) => void;
}
