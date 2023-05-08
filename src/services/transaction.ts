import axios from "axios";
import { ITransactionParams } from "./ITransactionPrams";
import { IResponseRoute } from "./IResponseRoute";

const chainId: Record<string, number> = {
  ethereum: 1,
  polygon: 137,
};

const tokenAddress: Record<string, string> = {
  ETH: "0x0000000000000000000000000000000000000000",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

export const getQuote = async (
  params: ITransactionParams
): Promise<IResponseRoute> => {
  const { fromAddress, fromChain, fromToken, toChain, toToken, amount } =
    params;

  let quote: IResponseRoute = {};
  try {
    const data = await axios.get(
      `https://swap.prod.swing.xyz/v0/transfer/quote?fromChain=${fromChain}&fromChainId=${chainId[fromChain]}&fromTokenAddress=${tokenAddress[fromToken]}&fromUserAddress=${fromAddress}&toChain=${toChain}&toChainId=${chainId[toChain]}&toTokenAddress=${tokenAddress[toToken]}&toTokenSymbol=${toToken}&tokenAmount=${amount}&tokenSymbol=${fromToken}&projectId=swing-xyz-par`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseRoutes = data.data.routes;

    if (responseRoutes.length > 0) {
      quote = {
        bridge: responseRoutes[0].route[0].bridge,
        bridgeFee: responseRoutes[0].quote.bridgeFeeUSD,
        gas: responseRoutes[0].gas,
        gasUSD: responseRoutes[0].gasUSD,
      };
      return quote;
    } else {
      quote = { response: "Unable to retrieve quote.  Please try again" };
      return quote;
    }
  } catch (error) {
    console.log(error);
    return (quote = {
      response: "Unable to retrieve quote.  Please try again",
    });
  }
};
