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
    alert('Please install MetaMask and try again')
    return;
  }

  try {
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const account = await signer.getAddress();

    dispatch(connectMetamaskSuccess(account));
  } catch (error) {
    dispatch(
      connectMetamaskFailure("User rejected access to Ethereum account.")
    );
  }
};

export const getMetamaskApproval =
  (
    tokenAddress: string,
    walletAddress: string,
    amountWei: number,
    decimals: number
  ) =>
  async (dispatch: any) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const erc20Abi = [
        "function approve(address spender, uint256 amount) public returns (bool)",
      ];

      const iface = new ethers.utils.Interface(erc20Abi);
      const data = iface.encodeFunctionData("approve", [
        walletAddress,
        ethers.utils.parseUnits(amountWei.toString(), decimals),
      ]);

      const transaction = {
        to: tokenAddress,
        data: data,
        from: address,
        gasPrice: await provider.getGasPrice(),
      };

      const txResponse = await signer.sendTransaction(transaction);
      const receipt = await provider.waitForTransaction(txResponse.hash);

      if (receipt) {
        dispatch(_metamaskApproval(receipt));
      }
    } catch (error) {
      console.log(error);
    }
  };

// Initial State
const initialState = {
  account: "",
  receipt: {},
};

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
