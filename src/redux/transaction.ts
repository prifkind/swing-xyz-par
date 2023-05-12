import axios from "axios";
import { IGetQuoteParams } from "../services/IGetQuoteParams";
import { IQuote } from "../services/IQuote";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Actions
const POST_TRANSACTION = "POST_TRANSACTION";

// Action Creators
const _postTransaction = (transaction: any) => {
  return {
    type: POST_TRANSACTION,
    transaction: transaction,
  };
};

// Thunks
export const postTransaction = (formData: IGetQuoteParams, quote: IQuote) => {
  return async (dispatch: any) => {
    const { data } = await axios.post(
      `${BASE_URL}/transer/send`,
      { headers: { "Content-Type": "application/json" } },
      {
        data: {
          tokenSymbol: formData.fromToken,
          toTokenSymbol: formData.toToken,
          fromTokenAddress: formData.fromTokenAddress,
          tokenAmount: formData.amount,
          fromUserAddress: formData.fromAddress,
          fromChain: formData.fromChain,
          fromChainId: formData.fromChainId,
          toChain: formData.toChain,
          toChainId: formData.fromChainId,
          toTokenAddress: formData.toTokenAddress,
          route: [
            {
              bridge: quote.bridge,
              bridgeTokenAddress: "",
              name: "",
              part: "",
            },
          ],
        },
      }
    );
  };
};

// Initial State
const initialState = {
  transaction: [],
};

//Reducer
export default function transactionReducer(state = initialState, action: any) {
  switch (action.type) {
    case POST_TRANSACTION: {
      return {
        ...state,
        transaction: action.transaction,
      };
    }
    default:
      return state;
  }
}
