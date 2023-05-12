import { IReduxState } from "../../redux/IReduxState";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";

export interface ITransactionStatusProps extends IReduxState {
  approval: any;
  approveTokenAndPostTransaction: (formData: IGetQuoteParams, route: any, approval: any) => any;
  formData: IGetQuoteParams;
  metamaskApproval: (tokenAddress: string, walletAddress: string, amountWei: number, decimals: number) => any;
  processing: boolean;
  route: any;
  setTxInitiated: (txInitiated: boolean) => void;
  transaction: any;
}
