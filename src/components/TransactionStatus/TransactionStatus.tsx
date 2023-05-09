import React, { FunctionComponent, useState } from "react";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";
import { ITransactionStatusProps } from "./ITransactionStatusProps";
import { postTransaction } from "../../services/transaction";
import { status } from "../../services/status";

const TransactionStatus: FunctionComponent<ITransactionStatusProps> = (
  props: ITransactionStatusProps
) => {
  const { allowance, formData, quote, setAllowance } = props;

  const [txnProcessing, setTxnProcessing] = useState(false);
  const [txnStatus, setTxnStatus] = useState("");

  const onApproveHandler = async () => {
    setTxnProcessing(true);
    const txnResult: number = await postTransaction(formData, quote);

    console.log(txnResult);
    if (txnResult === 200) {
      for (let i = 0; i < status.length; i++) {
        setTimeout(() => {
          const num = Math.floor(Math.random() * status.length);
          console.log(status[num].status);
          setTxnStatus(status[num].status);
        }, 1000);
        if (txnStatus === "Completed" || txnStatus === "Refund Required") break;
      }
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
            <ClipLoader />
          )}
        </div>
      </div>
    );
  }
};

export default TransactionStatus;
