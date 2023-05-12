import React, { FormEventHandler, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { connect } from "react-redux";
import "./styles.css";
import { ITransactionFormProps } from "./ITransactionFormProps";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
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
  } = props;

  const [token, setToken] = useState({ address: "", decimals: 0, symbol: "" });
  const [formData, setFormData] = useState({
    amount: null,
    amountWei: null,
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
    if (chains && chains.length > 0) {
      setToken(
        chains[0].tokens[Math.floor(Math.random() * chains[0].tokens.length)]
      );
    }
  }, [chains]);

  const updateFormData = (key: string, value: string | number) => {
    if (key === "fromChain" && value === "polygon") {
      setFormData({
        ...formData,
        [key]: value,
        fromChainId: 137,
        toChain: "bsc",
        toChainId: 56,
        toToken: `${token}`,
        toTokenAddress: `${token.address}`,
      });
    } else {
      setFormData({
        ...formData,
        [key]: value,
      });
    }
    setStale(true);
  };

  const onCancelHandler = () => {
    setFormData({
      amount: null,
      amountWei: null,
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
    connectMetamask()
    setProcessing(true);
    setStale(false);

    postFormData(formData);
    getQuote(formData);
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
            <option value={`${token.symbol}`}>{`${token.symbol}`}</option>
          </select>
        </span>
        <span className="amountContainer">
          <label htmlFor="amount">Token Amount:</label>
          <input
            type="string"
            id="amount"
            name="amount"
            className="amountInput"
            onChange={(e) => {
              updateFormData("amount", +e.target.value);
              // handleAmountChange(+e.target.value);
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
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    getQuote: (formData: IGetQuoteParams) => dispatch(fetchQuote(formData)),
    postFormData: (formData: IGetQuoteParams) => dispatch(_formData(formData)),
    setAllowance: (allowance: number) => dispatch(_setAllowance(allowance)),
    connectWallet: () => connectMetamask(),
  };
};
export default connect(mapState, mapDispatch)(TransactionForm);
