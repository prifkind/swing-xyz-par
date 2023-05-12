import axios from "axios";
import { IGetQuoteParams } from "../services/IGetQuoteParams";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Actions
const GET_QUOTE = "GET_QUOTE";
const FORM_DATA = "FORM_DATA";

// Action Creators
const _getQuote = (quote: any) => {
  return {
    type: GET_QUOTE,
    quote: quote,
  };
};

export const _formData = (formData: IGetQuoteParams) => {
  return {
    type: FORM_DATA,
    form: formData,
  };
};

// Thunks
export const fetchQuote = (formInfo: any) => {
  return async (dispatch: any) => {
    const { data } = await axios.get(
      `${BASE_URL}/transfer/quote?fromChain=${formInfo.fromChain}&fromChainId=${formInfo.fromChainId}&fromTokenAddress=${formInfo.fromTokenAddress}&fromUserAddress=${formInfo.fromAddress}&toChain=${formInfo.toChain}&toChainId=${formInfo.toChainId}&toTokenAddress=${formInfo.toTokenAddress}&toTokenSymbol=${formInfo.toToken}&tokenAmount=${formInfo.amount}&tokenSymbol=${formInfo.fromToken}&toUserAddress=${formInfo.toAddress}&projectId=swing-xyz-par`
    );
    dispatch(_getQuote(data));
  };
};

// Initial State
const initialState = {
  routes: [],
  form: {}
};

// Reducer
export default function quoteReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_QUOTE: {
      const routes = action.quote.routes.map((route: any) => route);
      return {
        ...state,
        routes: routes
      };
    }
    case FORM_DATA: {
        return {
            ...state,
            form: action.form
        }
    }
    default:
      return state;
  }
}
