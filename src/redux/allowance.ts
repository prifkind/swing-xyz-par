import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Actions
const GET_ALLOWANCE = "GET_ALLOWANCE";
const SET_ALLOWANCE = "SET_ALLOWANCE"

// Action Creators
const _getAllowance = (allowance: any) => {
  return {
    type: GET_ALLOWANCE,
    allowance,
  };
};

export const _setAllowance = (allowance: number) => {
  return {
    type: SET_ALLOWANCE,
    allowance
  }
}
// Thunks
export const fetchAllowance = (formInfo: any, route: any) => {
  return async (dispatch: any) => {
    const { data } = await axios.get(
      `${BASE_URL}/transfer/allowance?fromChain=${formInfo.fromChain}&fromChainId=${formInfo.fromChainId}&tokenAddress=${formInfo.fromTokenAddress}&fromAddress=${formInfo.fromAddress}&toChain=${formInfo.toChain}&toChainId=${formInfo.toChainId}&toTokenAddress=${formInfo.toTokenAddress}&toTokenSymbol=${formInfo.toToken}&tokenSymbol=${formInfo.fromToken}&bridge=${route.bridge}&projectId=swing-xyz-par`
    );
    dispatch(_getAllowance(data));
  };
};

// Initial State
const initialState = {
  allowance: -1,
};

// Reducer
export default function allowanceReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ALLOWANCE: {
      return {
        ...state,
        allowance: action.allowance,
      };
    }
    case SET_ALLOWANCE: {
      return {
        ...state,
        allowance: action.allowance
      }
    }
    default:
      return state;
  }
}
