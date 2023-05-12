import { ethers } from "ethers";

// Actions
const CONNECT_METAMASK_REQUEST = "CONNECT_METAMASK_REQUEST";
const CONNECT_METAMASK_SUCCESS = "CONNECT_METAMASK_SUCCESS";
const CONNECT_METAMASK_FAILURE = "CONNECT_METAMASK_FAILURE";
const METAMASK_APPROVAL = "METAMASK_APPROVAL";

// Action Creators
const connectMetamaskRequest = () => ({ type: CONNECT_METAMASK_REQUEST });
const connectMetamaskSuccess = (account: any) => ({
  type: CONNECT_METAMASK_SUCCESS,
  payload: account,
});
const connectMetamaskFailure = (error: any) => ({
  type: CONNECT_METAMASK_FAILURE,
  payload: error,
});
const _metamaskApproval = (receipt: any) => {
  return {
    type: METAMASK_APPROVAL,
    payload: receipt,
  };
};

// Thunks
export const connectMetamask = () => async (dispatch: any) => {
  dispatch(connectMetamaskRequest());

  if (!(window as any).ethereum) {
    const error = "No Ethereum provider was found. Please install MetaMask.";
    console.log(`error`);
    dispatch(connectMetamaskFailure(error));
    return;
  }

  try {
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });

    // @ts-ignore: Unreachable code error
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const account = await signer.getAddress();

    // Set current wallet ID to state
    dispatch(connectMetamaskSuccess(account));
  } catch (error) {
    dispatch(
      connectMetamaskFailure("User rejected access to Ethereum account.")
    );
  }
};

export const getMetamaskApproval =
  (tokenAddress: string, walletAddress: string, amountWei: number) =>
  async (dispatch: any) => {
    // @ts-ignore: Unreachable code error

    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      const erc20Abi = [
        // Some details about the token
        "function name() view returns (string)",
        "function symbol() view returns (string)",

        // Get the account balance
        "function balanceOf(address) view returns (uint)",

        // Approve the spending of the token
        "function approve(address spender, uint amount) returns (bool)",
      ];

      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

      const amountToApprove = ethers.utils.parseUnits(
        amountWei.toString(),
        "18"
      );

      const approvalTx = await tokenContract.approve(
        walletAddress,
        amountToApprove
      );

      const receipt = await approvalTx.wait();
      dispatch(_metamaskApproval(receipt));
    } catch (error) {
      console.log(error);
    }
  };

// Initial State
const initialState = {};

// Reducer
export default function walletReducer(state = initialState, action: any) {
  switch (action.type) {
    case CONNECT_METAMASK_REQUEST: {
      return {
        ...state,
      };
    }
    case CONNECT_METAMASK_SUCCESS: {
      return {
        ...state,
        account: action.payload,
      };
    }
    case METAMASK_APPROVAL: {
      return {
        ...state,
        receipt: action.payload,
      };
    }
    default:
      return state;
  }
}
