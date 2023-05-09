import React, { FunctionComponent, useEffect, useState } from "react";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";
import { ITransactionStatusProps } from "./ITransactionStatusProps";
import { postTransaction } from "../../services/transaction";
import { status } from "../../services/status";

const TransactionStatus: FunctionComponent<ITransactionStatusProps> = (
  props: ITransactionStatusProps
) => {
  const { allowance, formData, quote, setAllowance } = props;

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

  const onApproveHandler = async () => {
    setTxnProcessing(true);
    const txnResult: number = await postTransaction(formData, quote);

    if (txnResult === 200) {
      setIteration(0);
    } else setTxnStatus("Not Sent");
  };

  const onRejectHandler = () => {
    setAllowance(-1);
    alert("Transaction Rejected");
  };

  if (formData.amount > allowance && !txnProcessing && txnStatus === "") {
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

export default TransactionStatus;
