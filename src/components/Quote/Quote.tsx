import React from "react";
import { FunctionComponent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { IQuoteProps } from "./IQuoteProps";
import { getAllowance } from "../../services/transaction";

const Quote: FunctionComponent<any> = (props: IQuoteProps) => {
  const {
    formFields,
    processing,
    quote,
    setAllowance,
    setTxInitiated,
    stale,
    txInitiated,
  } = props;

  const onClickHandler = async () => {
    setTxInitiated(true);
    const newAllowance = await getAllowance(formFields, quote);
    setAllowance(newAllowance);
  };

  if (processing) {
    return <ClipLoader />;
  } else if (stale) {
    return null;
  } else if (quote.response) {
    return <div>{quote.response}</div>;
  } else {
    return (
      <div>
        <div>Bridge: {quote.bridge}</div>
        <div>Bridge Fee: {quote.bridgeFee}</div>
        <div>Gas: {quote.gas}</div>
        <div>Gas USD: {quote.gasUSD}</div>
        {txInitiated ? null : (
          <button onClick={onClickHandler}>Initiate Transfer</button>
        )}
      </div>
    );
  }
};

export default Quote;
