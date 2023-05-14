import axios from "axios";
import { IFormDataProps } from "../components/TransactionStatus/IFormDataProps";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const TEST_URL = process.env.REACT_APP_TEST_URL;

// Actions
const SELECT_ROUTE = "SELECT_ROUTE";
const APPROVE_TOKEN = "APPROVE_TOKEN";
const POST_TRANSACTION = "POST_TRANSACTION";

// Action Creators
export const _selectRoute = (route: any, amount: string) => {
  return {
    type: SELECT_ROUTE,
    payload: { route: route, amount: amount },
  };
};

const _approveToken = (approval: any) => {
  return {
    type: APPROVE_TOKEN,
    payload: approval,
  };
};

const _postTransaction = (transaction: any) => {
  return {
    type: POST_TRANSACTION,
    payload: transaction,
  };
};

// Thunks
export const approveToken = (formData: IFormDataProps, route: any) => {
  const amountWei = BigInt(formData.amountWei);
  const tokenAmount = amountWei * BigInt(1000000000);

  return async (dispatch: any) => {
    const { data } = await axios.get(
      `${BASE_URL}/transfer/approve?bridge=${route.bridge}&fromAddress=${formData.fromAddress}&fromChain=${formData.fromChain}&fromChainId=${formData.fromChainId}&toChain=${formData.toChain}&toChainId=${formData.toChainId}&toTokenAddress=${formData.toTokenAddress}&toTokenSymbol=${formData.toToken}&tokenAddress=${formData.fromTokenAddress}&tokenAmount=${tokenAmount}&tokenSymbol=${formData.fromToken}`
    );

    dispatch(_approveToken(data));
  };
};

export const postTransaction = (
  formData: IFormDataProps,
  route: any,
  contract: any
) => {
  return async (dispatch: any) => {
    try {
      const { data } = await axios.post(
        // `${BASE_URL}/transfer/send`,
        `${TEST_URL}/transfer/send`,
        {
          tokenSymbol: formData.fromToken,
          toTokenSymbol: formData.toToken,
          tokenAmount: `${formData.amountWei}`,
          fromChain: formData.fromChain,
          fromChainId: formData.fromChainId,
          fromTokenAddress: formData.fromTokenAddress,
          fromUserAddress: formData.fromAddress,
          toChain: formData.toChain,
          toChainId: formData.toChainId,
          toTokenAmount: route.amount,
          toTokenAddress: formData.toTokenAddress,
          toUserAddress: formData.toAddress,
          route: [
            {
              bridge: route.bridge,
              bridgeTokenAddress: route.bridgeTokenAddress,
              name: route.name,
              steps: route.steps,
              part: route.part,
            },
          ],
          // toContractAddress: contract.to,
          // toContractCallData: contract.data,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(_postTransaction(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const approveTokenAndPostTransaction = (
  formData: IFormDataProps,
  route: any
) => {
  return async (dispatch: any, getState: any) => {
    await dispatch(approveToken(formData, route.route));
    const updatedState = getState();
    const updatedApproval = updatedState.transaction.approval;
    dispatch(postTransaction(formData, route.route, updatedApproval));
  };
};

// Initial State
const initialState = {
  approval: {},
  route: {},
  transaction: {},
};

//Reducer
export default function transactionReducer(state = initialState, action: any) {
  switch (action.type) {
    case SELECT_ROUTE: {
      return {
        ...state,
        route: action.payload,
      };
    }
    case APPROVE_TOKEN: {
      return {
        ...state,
        approval: action.payload,
      };
    }
    case POST_TRANSACTION: {
      return {
        ...state,
        transaction: action.payload,
      };
    }
    default:
      return state;
  }
}
