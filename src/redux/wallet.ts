import { ethers } from "ethers";

// Actions
const CONNECT_METAMASK_REQUEST = 'CONNECT_METAMASK_REQUEST';
const CONNECT_METAMASK_SUCCESS = 'CONNECT_METAMASK_SUCCESS';
const CONNECT_METAMASK_FAILURE = 'CONNECT_METAMASK_FAILURE';

// Action Creators
const connectMetamaskRequest = () => ({ type: CONNECT_METAMASK_REQUEST });
const connectMetamaskSuccess = (account: any) => ({ type: CONNECT_METAMASK_SUCCESS, payload: account });
const connectMetamaskFailure = (error: any) => ({ type: CONNECT_METAMASK_FAILURE, payload: error });

// Thunks
export const connectMetamask = () => async (dispatch: any) => {
    dispatch(connectMetamaskRequest());

    if (!(window as any).ethereum) {
      const error = "No Ethereum provider was found. Please install MetaMask.";
      dispatch(connectMetamaskFailure(error));
      return;
    }

    try {
      // Request account access
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

      // We don't know window.ethereum prior to compilation, so we suppress warnings with ts-ignore
      // @ts-ignore: Unreachable code error
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const account = await signer.getAddress();

      dispatch(connectMetamaskSuccess(account));
    } catch (error) {
      dispatch(connectMetamaskFailure("User rejected access to Ethereum account."));
    }
  };

  // Initial State
  const initialState = {

  }

  // Reducer
  export default function walletReducer(state = initialState, action:any) {
    switch(action.type) {
        case CONNECT_METAMASK_REQUEST: {
            return {
                ...state,
            }
        }
        default: return state;
    }
  }
