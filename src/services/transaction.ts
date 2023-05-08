import axios from "axios";
import { IGetQuoteParams } from "./IGetQuoteParams";
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
  params: IGetQuoteParams
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

    console.log(responseRoutes);
    if (responseRoutes.length > 0) {
      quote = {
        bridge: responseRoutes[0].route[0].bridge,
        bridgeFee: responseRoutes[0].quote.bridgeFeeUSD,
        bridgeTokenAddress: responseRoutes[0].route[0].bridgeTokenAddress,
        gas: responseRoutes[0].gas,
        gasUSD: responseRoutes[0].gasUSD,
        name: responseRoutes[0].route[0].name,
        part: responseRoutes[0].route.part,
        steps: responseRoutes[0].route[0].steps,
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

export const getAllowance = async (
  formFields: IGetQuoteParams,
  quote: IResponseRoute
): Promise<string> => {
  const { fromAddress, fromChain, fromToken, toChain, toToken } = formFields;

  console.log(formFields, quote);
  try {
    const data = await axios.get(
      `https://stoplight.io/mocks/swing/crosschain-api/68673/v0/transfer/allowance?fromChain=${fromChain}&fromChainId=${chainId[fromChain]}&tokenAddress=${tokenAddress[fromToken]}&fromAddress=${fromAddress}&toChain=${toChain}&toChainId=${chainId[toChain]}&toTokenAddress=${tokenAddress[toToken]}&toTokenSymbol=${toToken}&tokenSymbol=${fromToken}&bridge=${quote.bridge}projectId=swing-xyz-par`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = data.data.allowance;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postTransaction = async (
  formFields: IGetQuoteParams,
  quote: IResponseRoute
): Promise<any> => {
  try {
    const data = await axios.post(
      `
      https://stoplight.io/mocks/swing/crosschain-api/68673
      /v0/transfer/send`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        data: {
          tokenSymbol: formFields.fromToken,
          toTokenSymbol: formFields.toToken,
          fromTokenAddress: tokenAddress[formFields.fromToken],
          tokenAmount: formFields.amount,
          fromUserAddress: formFields.fromAddress,
          fromChain: formFields.fromChain,
          fromChainId: chainId[formFields.fromChain],
          toChain: formFields.toChain,
          toChainId: chainId[formFields.toChain],
          toTokenAddress: tokenAddress[formFields.toToken],
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

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getStatus = async (transaction: any): Promise<any> => {
  try {
    const data = await axios.get(
      `https://stoplight.io/mocks/swing/crosschain-api/68673/v0/transfer/status?fromChain=ethereum&fromChainId=1&bridge=${transaction.route[0].bridge}&fromChain=${transaction.fromChain.slug}&fromChainId=${transaction.fromChain.chainId}&txHash=0xe95625675e23894b37c6310bc21c2614fa1903a1b8b2755f2b8a2e358b0d1ad3`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
