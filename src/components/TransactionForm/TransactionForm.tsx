import React, { FormEventHandler, useState } from "react";
import { FunctionComponent } from "react";
import "./styles.css";
import { ITransactionFormProps } from "./ITransactionFormProps";
import { getQuote } from "../../services/transaction";

const TransactionForm: FunctionComponent<ITransactionFormProps> = (
  props: ITransactionFormProps
) => {
  const { setFormFields, setProcessing, setQuote, setStale } = props;
  const [formData, setFormData] = useState({
    amount: "",
    fromAddress: "",
    fromChain: "",
    fromToken: "",
    toAddress: "",
    toChain: "",
    toToken: "",
  });

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
    setFormData((prevState) => ({ ...prevState, [key]: value }));
    setFormFields(formData);
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
          />

          <label htmlFor="fromChain">From Chain:</label>
          <select
            id="fromChain"
            onChange={(e) => updateFormData("fromChain", e.target.value)}
            className="fromInput"
          >
            <option value=""></option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
          </select>
          <label htmlFor="fromToken">From Token:</label>
          <select
            id="fromToken"
            className="fromInput"
            onChange={(e) => updateFormData("fromToken", e.target.value)}
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
          />
          <label htmlFor="toChain">To Chain:</label>
          <select
            id="toChain"
            onChange={(e) => updateFormData("toChain", e.target.value)}
          >
            <option value=""></option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
          </select>

          <label htmlFor="toToken">To Token:</label>
          <select
            id="toToken"
            onChange={(e) => updateFormData("toToken", e.target.value)}
          >
            <option value=""></option>
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
          </select>
        </span>
        <span>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            className="toInput"
            onChange={(e) => updateFormData("amount", e.target.value)}
          />
          <button type="submit">Get Quote</button>
        </span>
      </form>
    </div>
  );
};

export default TransactionForm;
