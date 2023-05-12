import { IChain } from "./IChain";

export interface IReduxState {
  allowance?: any;
  chains?: IChain[];
  quote?: any;
  transaction?: any;
}
