import React, { FunctionComponent, useEffect } from "react";
import { approveTokenAndPostTransaction } from "../../redux/transaction";
import "./styles.css";
import { ClipLoader } from "react-spinners";
import { ISendProps } from "./ISendProps";
import { IFormDataProps } from "./IFormDataProps";
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
        <div className="statusContainer">
          <span>
            <ClipLoader size={25} className="spinner" />
          </span>
          <span className="textContainer">Sending transaction</span>
          <div className="statusText">This is step 3/4</div>
        </div>
      ) : (
        <div className="statusContainer">
        <div className="textContainer">
          <span>Sending transaction</span>
          <div className="statusText">This is step 3/4</div>
        </div>
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
    approveTokenAndPostTransaction: (formData: IFormDataProps, route: any) =>
      dispatch(approveTokenAndPostTransaction(formData, route)),
  };
};

export default connect(mapState, mapDispatch)(Send);
