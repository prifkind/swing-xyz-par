import React, { FormEventHandler, useState } from "react";
import { FunctionComponent } from "react";
import "./styles.css";
import { ITransactionFormProps } from "./ITransactionFormProps";
import { getQuote } from "../../services/transaction";

const TransactionForm: FunctionComponent<ITransactionFormProps> = (
  props: ITransactionFormProps
) => {
  const { setProcessing, setQuote } = props;
  const [amount, setAmount] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [fromChain, setFromChain] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [toChain, setToChain] = useState("");
  const [toToken, setToToken] = useState("");

  const [formData, setFormData] = useState({
    amount,
    fromAddress,
    fromChain,
    fromToken,
    toAddress,
    toChain,
    toToken,
  });

  const onSubmitHandler: FormEventHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setProcessing(true);

    let newQuote = await getQuote(formData);
    setQuote(newQuote);

    setProcessing(false);
  };

  return (
    <div>
      <form
        className="transactionFormContainer"
        onSubmit={onSubmitHandler}
        onChange={() => {
          setFormData({
            fromAddress,
            fromChain,
            fromToken,
            toAddress,
            toChain,
            toToken,
            amount,
          });
        }}
      >
        <span className="fromContainer">
          <label htmlFor="fromAddress">From Address:</label>
          <input
            type="text"
            id="fromAddress"
            name="fromAddress"
            className="fromInput"
            onChange={(e) => setFromAddress(e.target.value)}
          />

          <label htmlFor="fromChain">From Chain:</label>
          <input
            type="text"
            id="fromChain"
            name="fromChain"
            className="fromInput"
            onChange={(e) => setFromChain(e.target.value)}
          />

          <label htmlFor="fromToken">From Token:</label>
          <input
            type="text"
            id="fromToken"
            name="fromChain"
            className="fromInput"
            onChange={(e) => setFromToken(e.target.value)}
          />
        </span>
        <span className="toContainer">
          <label htmlFor="toAddress">To Address:</label>
          <input
            type="text"
            id="toAddress"
            name="toAddress"
            className="toInput"
            onChange={(e) => setToAddress(e.target.value)}
          />
          <label htmlFor="toChain">To Chain:</label>
          <input
            type="text"
            id="toChain"
            name="toChain"
            className="toInput"
            onChange={(e) => setToChain(e.target.value)}
          />
          <label htmlFor="toToken">To Token:</label>
          <input
            type="text"
            id="toToken"
            name="toToken"
            onChange={(e) => setToToken(e.target.value)}
          />
        </span>
        <span>
          <label htmlFor="toToken">Amount:</label>
          <input
            type="string"
            id="amount"
            name="amount"
            className="toInput"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit">Get Quote</button>
        </span>
      </form>


    </div>
  );
};

export default TransactionForm;
