import React, { FunctionComponent, useEffect, useState } from "react";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";
import { ITransactionStatusProps } from "./ITransactionStatusProps";
import { status } from "../../services/status";
import { connect } from "react-redux";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import {
  approveTokenAndPostTransaction,
} from "../../redux/transaction";
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
    route,
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
      formData.amountWei
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
    approval: state.transaction.approval,
    chains: state.chains.chains,
    formData: state.quote.form,
    quote: state.quote.quote,
    route: state.transaction.route,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    approveTokenAndPostTransaction: (
      formData: IGetQuoteParams,
      route: any,
      approval: any
    ) => dispatch(approveTokenAndPostTransaction(formData, route, approval)),
    metamaskApproval: (
      fromTokenAddress: string,
      fromWalletAddress: string,
      amountWei: number
    ) =>
      dispatch(
        getMetamaskApproval(fromTokenAddress, fromWalletAddress, amountWei)
      ),
  };
};

export default connect(mapState, mapDispatch)(TransactionStatus);
