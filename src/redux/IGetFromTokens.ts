import { IChain } from "./IChain";

export const GET_CHAINS = "GET_CHAINS";

export interface IGetFromChainsAction {
  type: typeof GET_CHAINS;
  chains: {
    chains: IChain[];
  };
}

export type IChainsAction = IGetFromChainsAction;
