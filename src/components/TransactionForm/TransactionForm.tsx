import React, { FormEventHandler, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { connect } from "react-redux";
import "./styles.css";
import { ITransactionFormProps } from "./ITransactionFormProps";
import { IFormDataProps } from "../TransactionStatus/IFormDataProps";
import { _formData, fetchQuote } from "../../redux/quote";
import { _setAllowance } from "../../redux/allowance";
import { connectMetamask } from "../../redux/wallet";

const TransactionForm: FunctionComponent<ITransactionFormProps> = (
  props: ITransactionFormProps
) => {
  const {
    chains,
    getQuote,
    postFormData,
    setAllowance,
    setProcessing,
    setStale,
    setTxInitiated,
    connectWallet,
  } = props;

  const [token, setToken] = useState({ address: "", decimals: 0, symbol: "" });
  const [formData, setFormData] = useState<{
    amount: number | null;
    amountWei: number | null;
    decimals: number;
    fromAddress: string;
    fromChain: string;
    fromChainId: number;
    fromToken: string;
    fromTokenAddress: string;
    toAddress: string;
    toChain: string;
    toChainId: number;
    toToken: string;
    toTokenAddress: string;
  }>({
    amount: null,
    amountWei: null,
    decimals: 18,
    fromAddress: "",
    fromChain: "",
    fromChainId: 0,
    fromToken: "",
    fromTokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    toAddress: "",
    toChain: "",
    toChainId: 0,
    toToken: "",
    toTokenAddress: "",
  });

  useEffect(() => {
    if (chains && chains.length > 0 && formData.toToken.length > 0) {
      const tokenAddress = chains[0].tokens.filter(
        (token) => token.symbol === formData.toToken
      )[0].address;

      const tokenDecimals = chains[0].tokens.filter(
        (token) => token.symbol === formData.toToken
      )[0].decimals;

      setToken({
        address: tokenAddress,
        decimals: tokenDecimals,
        symbol: formData.toToken,
      });

      setFormData({
        ...formData,
        decimals: tokenDecimals,
        toTokenAddress: tokenAddress,
      });
    }
  }, [chains, formData.toToken]);

  const updateFormData = (key: any, value: string | number) => {
    if (key === "fromChain" && value === "polygon") {
      setFormData({
        ...formData,
        [key]: value,
        fromChainId: 137,
        toChain: "bsc",
        toChainId: 56,
      });
    } else if (key === "amount") {
      setFormData({
        ...formData,
        [key]: value,
        amountWei: +value * Math.pow(10, token.decimals),
      });
    } else {
      setFormData({
        ...formData,
        [key]: value,
        amount: null,
        amountWei: null,
      });
    }
    setStale(true);
  };

  const onCancelHandler = () => {
    setFormData({
      amount: null,
      amountWei: null,
      decimals: 18,
      fromAddress: "",
      fromChain: "",
      fromChainId: 0,
      fromToken: "",
      fromTokenAddress: "",
      toAddress: "",
      toChain: "",
      toChainId: 0,
      toToken: "",
      toTokenAddress: "",
    });
    setStale(true);
    setAllowance(-1);
    setTxInitiated(false);
  };

  const onSubmitHandler: FormEventHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    connectWallet();
    setProcessing(true);
    setStale(false);

    postFormData(formData);
    await getQuote(formData);
    setProcessing(false);
  };

  return (
    <div>
      <form className="transactionFormContainer" onSubmit={onSubmitHandler}>
        <span className="fromContainer">
          <label htmlFor="fromAddress">From Address:</label>
          <input
            type="text"
            id="fromAddress"
            name="fromAddress"
            className="fromInput"
            onChange={(e) => updateFormData("fromAddress", e.target.value)}
            value={formData.fromAddress}
          />

          <label htmlFor="fromChain">From Chain:</label>
          <select
            id="fromChain"
            onChange={(e) => updateFormData("fromChain", e.target.value)}
            className="fromSelect"
            value={formData.fromChain}
          >
            <option value=""></option>
            <option value="polygon">Polygon</option>
          </select>
          <label htmlFor="fromToken">From Token:</label>
          <select
            id="fromToken"
            className="fromSelect"
            onChange={(e) => updateFormData("fromToken", e.target.value)}
            value={formData.fromToken}
          >
            <option value=""></option>
            <option value="USDC">USDC</option>
          </select>
        </span>
        <span className="toContainer">
          <label htmlFor="toAddress">To Address:</label>
          <input
            type="text"
            id="toAddress"
            name="toAddress"
            className="toInput"
            onChange={(e) => updateFormData("toAddress", e.target.value)}
            value={formData.toAddress}
          />
          <label htmlFor="toChain">To Chain:</label>
          <select
            className="toSelect"
            id="toChain"
            onChange={(e) => updateFormData("toChain", e.target.value)}
            value={formData.toChain}
          >
            <option
              value={
                formData.fromChain === "polygon" ? "Binance Smart Chain" : ""
              }
            ></option>
            <option value="bsc">Binance Smart Chain</option>
          </select>

          <label htmlFor="toToken">To Token:</label>
          <select
            className="toSelect"
            id="toToken"
            onChange={(e) => updateFormData("toToken", e.target.value)}
            value={formData.toToken}
          >
            <option value=""></option>
            {chains && chains.length > 0 ? (
              chains[0].tokens.map((token, index) => {
                return (
                  <option key={index} value={token.symbol}>
                    {token.symbol}
                  </option>
                );
              })
            ) : (
              <option value=""></option>
            )}
          </select>
        </span>
        <span className="amountContainer">
          <label htmlFor="amount">Token Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="amountInput"
            onChange={(e) => {
              updateFormData("amount", +e.target.value);
            }}
            value={formData.amount || ""}
          />
          <label htmlFor="amountWei">Amount Wei:</label>
          <input
            type="number"
            disabled={true}
            value={
              formData.amount
                ? formData.amount * Math.pow(10, token.decimals)
                : ""
            }
          />
          <button type="submit" className="getQuoteButton">
            Get Quote
          </button>
          <button
            type="button"
            onClick={onCancelHandler}
            className="transferButton"
          >
            Clear All
          </button>
        </span>
      </form>
    </div>
  );
};

const mapState = (state: any) => {
  return {
    chains: state.chains.chains,
    quote: state.quote.quote,
    wallet: state.wallet.account,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    getQuote: (formData: IFormDataProps) => dispatch(fetchQuote(formData)),
    postFormData: (formData: IFormDataProps) => dispatch(_formData(formData)),
    setAllowance: (allowance: number) => dispatch(_setAllowance(allowance)),
    connectWallet: () => dispatch(connectMetamask()),
  };
};
export default connect(mapState, mapDispatch)(TransactionForm);
