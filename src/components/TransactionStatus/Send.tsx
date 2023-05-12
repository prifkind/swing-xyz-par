import React, { FunctionComponent, useEffect } from "react";
import { approveTokenAndPostTransaction } from "../../redux/transaction";
import { ClipLoader } from "react-spinners";
import { ISendProps } from "./ISendProps";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Send: FunctionComponent<ISendProps> = (props: ISendProps) => {
  const {
    approveTokenAndPostTransaction,
    formData,
    processing,
    route,
    setProcessing,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    const sendTransaction = async () => {
      setProcessing(true);
      await approveTokenAndPostTransaction(formData, route);
      setProcessing(false);
      navigate("/complete");
    };

    sendTransaction();
  }, []);

  return (
    <div>
      {processing ? (
        <div>
          <ClipLoader size={25} className="spinner" /> Sending transaction
        </div>
      ) : (
        <div>
          <span>Sending Transaction</span>
          <div>Step 3/4</div>
        </div>
      )}
    </div>
  );
};

const mapState = (state: any) => {
  return {
    formData: state.quote.form,
    route: state.transaction.route,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    approveTokenAndPostTransaction: (formData: IGetQuoteParams, route: any) =>
      dispatch(approveTokenAndPostTransaction(formData, route)),
  };
};

export default connect(mapState, mapDispatch)(Send);
