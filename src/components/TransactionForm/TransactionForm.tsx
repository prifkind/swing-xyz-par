import React, { FormEventHandler } from "react";
import { FunctionComponent } from "react";
import "./styles.css";
import { ITransactionFormProps } from "./ITransactionFormProps";
import { getQuote } from "../../services/transaction";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";

const TransactionForm: FunctionComponent<ITransactionFormProps> = (
  props: ITransactionFormProps
) => {
  const {
    formData,
    setAllowance,
    setFormData,
    setProcessing,
    setQuote,
    setStale,
    setTxInitiated,
  } = props;

  const onCancelHandler = () => {
    setFormData(() => ({
      amount: "",
      fromAddress: "",
      fromChain: "",
      fromToken: "",
      toAddress: "",
      toChain: "",
      toToken: "",
    }));
    setStale(true);
    setAllowance(-1);
    setTxInitiated(false)
  };

  const onSubmitHandler: FormEventHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setProcessing(true);
    setStale(false);

    let newQuote = await getQuote(formData);
    setQuote(newQuote);
    setProcessing(false);
  };

  const updateFormData = (key: string, value: string) => {
    setFormData((prevState: IGetQuoteParams) => ({
      ...prevState,
      [key]: value,
    }));
    setStale(true);
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
            <option value="ethereum">Ethereum</option>
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
            <option value="ETH">ETH</option>
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
            <option value=""></option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
          </select>

          <label htmlFor="toToken">To Token:</label>
          <select
            className="toSelect"
            id="toToken"
            onChange={(e) => updateFormData("toToken", e.target.value)}
            value={formData.toToken}
          >
            <option value=""></option>
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
          </select>
        </span>
        <span className="amountContainer">
          <label htmlFor="amount">Amount (Wei):</label>
          <input
            type="text"
            id="amount"
            name="amount"
            className="amountInput"
            onChange={(e) => updateFormData("amount", e.target.value)}
            value={formData.amount}
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

export default TransactionForm;
