import React, { FunctionComponent, useState } from "react";
import { ITransactionStatusProps } from "./ITransactionStatusProps";
import { postTransaction } from "../../services/transaction";
import { status } from "../../services/status";

const TransactionStatus: FunctionComponent<ITransactionStatusProps> = (
  props: ITransactionStatusProps
) => {
  const { allowance, formFields, quote, setAllowance } = props;

  const [txnDetails, setTxnDetails] = useState<any>({});
  const [txnProcessing, setTxnProcessing] = useState(false);
  const [txnStatus, setTxnStatus] = useState("");

  const onApproveHandler = async () => {
    setTxnProcessing(true);
    const transaction: any = await postTransaction(formFields, quote);
    setTxnDetails(transaction.data);

    for (let i = 0; i < status.length; i++) {
      if (txnStatus === "Completed" || txnStatus === "Refund Required") {
        break;
      } else {
        setTimeout(() => {
          const num = Math.floor(Math.random() * status.length);
          setTxnStatus(status[num].status);
        }, 1000);
      }
    }
  };

  const onRejectHandler = () => {
    setAllowance(-1);
    alert("Transaction Rejected");
  };

  if (formFields.amount > allowance && !txnProcessing && txnStatus === "") {
    return (
      <div>
        <div>
          The transaction amount exceeds the allowance configured. Do you wish
          to approve the transaction?
        </div>
        <button onClick={onApproveHandler}>Approve</button>
        <button onClick={onRejectHandler}>Reject</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>Transaction Status: {txnStatus}</div>
      </div>
    );
  }
};

export default TransactionStatus;
