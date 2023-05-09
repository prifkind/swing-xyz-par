import React from "react";
import { FunctionComponent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles.css";
import { IQuoteProps } from "./IQuoteProps";
import { getAllowance } from "../../services/transaction";

const Quote: FunctionComponent<any> = (props: IQuoteProps) => {
  const {
    formData,
    processing,
    quote,
    setAllowance,
    setTxInitiated,
    stale,
    txInitiated,
  } = props;

  const onInitiateHandler = async () => {
    setTxInitiated(true);
    const newAllowance = await getAllowance(formData, quote);
    setAllowance(newAllowance);
  };

  if (processing) {
    return (
      <div>
        <ClipLoader size={25} className="spinner" /> Getting quote...
      </div>
    );
  } else if (stale) {
    return null;
  } else if (quote.response) {
    return (
      <div className="quoteContainer">
        <div className="quoteResponse">{quote.response}</div>
      </div>
    );
  } else {
    return (
      <div className="quoteContainer">
        <h1 className="quoteHeader">Quote Details</h1>
        <div>Bridge: {quote.bridge}</div>
        <div>Bridge Fee: {quote.bridgeFee}</div>
        <div>Gas: {quote.gas}</div>
        <div>Gas USD: {quote.gasUSD}</div>
        {txInitiated ? null : (
          <div>
            <button onClick={onInitiateHandler} className="transferButton">
              Initiate Transfer
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default Quote;
