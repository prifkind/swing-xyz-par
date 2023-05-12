import React, { FunctionComponent, useEffect, useState } from "react";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";
import { ITransactionStatusProps } from "./ITransactionStatusProps";
import { status } from "../../services/status";
import { connect } from "react-redux";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { approveTokenAndPostTransaction } from "../../redux/transaction";
import { getMetamaskApproval } from "../../redux/wallet";

const TransactionStatus: FunctionComponent<ITransactionStatusProps> = (
  props: ITransactionStatusProps
) => {
  const {
    allowance,
    approval,
    approveTokenAndPostTransaction,
    formData,
    metamaskApproval,
    processing,
    route,
    transaction,
  } = props;

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
    await metamaskApproval(
      formData.fromTokenAddress,
      formData.fromAddress,
      formData.amountWei,
      formData.decimals
    );

    await approveTokenAndPostTransaction(formData, route, approval);
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
          The transaction amount exceeds the allowance configured (current
          allowance - {allowance.allowance} ). Do you wish to approve the
          transaction?
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
  } else if (processing) {
    return (
      <div>
        <ClipLoader size={25} className="spinner" /> Processing...
      </div>
    );
  } else if (!transaction) {
    return (
      <div>
        <ClipLoader size={25} className="spinner" /> Processing transaction
      </div>
    );
  } else {
    return (
      <div className="statusContainer">
        <div>
          Transaction Status:{" "}
          {txnStatus === "Completed" || txnStatus === "Refund Required" ? (
            txnStatus
          ) : `Still processing`}
        </div>
      </div>
    );
  }
};

const mapState = (state: any) => {
  return {
    allowance: state.allowance.allowance,
    approval: state.transaction.approval,
    chains: state.chains.chains,
    formData: state.quote.form,
    quote: state.quote.quote,
    route: state.transaction.route,
    transaction: state.transaction.transaction,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    approveTokenAndPostTransaction: (formData: IGetQuoteParams, route: any) =>
      dispatch(approveTokenAndPostTransaction(formData, route)),
    metamaskApproval: (
      fromTokenAddress: string,
      fromWalletAddress: string,
      amountWei: number,
      decimals: number
    ) =>
      dispatch(
        getMetamaskApproval(
          fromTokenAddress,
          fromWalletAddress,
          amountWei,
          decimals
        )
      ),
  };
};

export default connect(mapState, mapDispatch)(TransactionStatus);
