import { IGetQuoteParams } from "../../services/IGetQuoteParams";

export interface IApproveProps {
  approving: boolean;
  formData: IGetQuoteParams;
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
