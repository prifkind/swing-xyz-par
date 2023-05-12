import React, { FunctionComponent, useEffect, useState } from "react";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";
import { ITransactionStatusProps } from "./ITransactionStatusProps";
import { status } from "../../services/status";
import { connect } from "react-redux";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { IQuote } from "../../services/IQuote";
import { postTransaction } from "../../redux/transaction";

const TransactionStatus: FunctionComponent<ITransactionStatusProps> = (
  props: ITransactionStatusProps
) => {
  const { allowance, formData, postTransaction, quote } = props;

  const [iteration, setIteration] = useState(0);
  const [txnProcessing, setTxnProcessing] = useState(false);
  const [txnStatus, setTxnStatus] = useState("");

  useEffect(() => {
    if (
      txnProcessing &&
      iteration < 100 &&
      txnStatus !== "Completed" &&
      txnStatus !== "Refund Required"
    ) {
      const timer = setTimeout(async () => {
        const num = Math.floor(Math.random() * status.length);
        setTxnStatus(status[num].status);

        setIteration(iteration + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [txnStatus, txnProcessing, iteration]);

  useEffect(() => {
    console.log(allowance);
  }, [allowance]);

  const onApproveHandler = async () => {
    setTxnProcessing(true);
    const txnResult: number = await postTransaction(formData, quote);

    if (txnResult === 200) {
      setIteration(0);
    } else setTxnStatus("Not Sent");
  };

  const onRejectHandler = () => {
    alert("Transaction Rejected");
  };

  if (
    formData.amount &&
    formData.amount > +allowance.allowance &&
    !txnProcessing &&
    txnStatus === ""
  ) {
    return (
      <div className="statusContainer">
        <div>
          The transaction amount exceeds the allowance configured. Do you wish
          to approve the transaction?
        </div>
        <div className="buttonContainer">
          <button className="statusButton" onClick={onApproveHandler}>
            Approve
          </button>
          <button className="statusButton" onClick={onRejectHandler}>
            Reject
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="statusContainer">
        <div>
          Transaction Status:{" "}
          {txnStatus === "Completed" || txnStatus === "Refund Required" ? (
            txnStatus
          ) : (
            <div>
              <ClipLoader size={25} /> Processing transaction...
            </div>
          )}
        </div>
      </div>
    );
  }
};

const mapState = (state: any) => {
  return {
    allowance: state.allowance.allowance,
    chains: state.chains.chains,
    formData: state.quote.form,
    quote: state.quote.quote,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    postTransaction: (formData: IGetQuoteParams, quote: IQuote) =>
      dispatch(postTransaction(formData, quote)),
  };
};

export default connect(mapState, mapDispatch)(TransactionStatus);
