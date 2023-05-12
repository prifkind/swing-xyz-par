import axios from "axios";
import { IToken } from "./IToken";
import { IChain } from "./IChain";
import { IGetFromChainsAction } from "./IGetFromTokens";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Actions
const GET_CHAINS = "GET_CHAINS";

// Action Creators
const _getChains = (chains: Array<IChain>) => {
  return {
    type: GET_CHAINS,
    chains,
  };
};

// Thunks
export const fetchChains = () => {
  return async (dispatch: any) => {
    const { data } = await axios.get(
      `${BASE_URL}/transfer/config?projectId=swing-xyz-par`
    );
    dispatch(_getChains(data));
  };
};

// Initial State
const initialState = {
  chains: [
    {
      name: "",
      chainId: 0,
      tokens: [
        {
          address: "",
          decimals: 0,
          symbol: "",
        },
      ],
    },
  ],
};

// Reducer
export default function chainsReducer(
  state = initialState,
  action: IGetFromChainsAction
) {
  switch (action.type) {
    case GET_CHAINS: {
      const chains = action.chains.chains.map((chain: IChain) => {
        return {
          name: chain.name,
          chainId: chain.chainId,
          tokens: chain.tokens.map((token: IToken) => {
            return {
              address: token.address,
              decimals: token.decimals,
              symbol: token.symbol,
            };
          }),
        };
      });

      return {
        ...state,
        chains: chains,
      };
    }
    default:
      return state;
  }
}
