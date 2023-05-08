import * as React from "react";
import { FunctionComponent } from "react";
import { IQuoteProps } from "./IQuoteProps";

const Quote: FunctionComponent<IQuoteProps> = (props: IQuoteProps) => {
const {quote} = props
    return (
        quote.response ? (
            <div>{quote.response}</div>
          ) : (
            <div>
              <div>Bridge: {quote.bridge}</div>
              <div>Bridge Fee: {quote.bridgeFee}</div>
              <div>Gas: {quote.gas}</div>
              <div>Gas USD: {quote.gasUSD}</div>
            </div>
          )
    )
};

export default Quote;
