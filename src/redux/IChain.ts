import { IToken } from "./IToken";

export interface IChain {
  name: string;
  chainId: number;
  tokens: Array<IToken>;
}
