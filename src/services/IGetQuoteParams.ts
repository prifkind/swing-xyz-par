export interface IGetQuoteParams {
  amount: number | null;
  amountWei: number | any;
  fromAddress: string;
  fromChain: string;
  fromChainId: number;
  fromToken: string;
  fromTokenAddress: string;
  toAddress: string;
  toChain: string;
  toChainId: number
  toToken: string;
  toTokenAddress: string;
}
