import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { getMetamaskApproval } from "../../redux/wallet";
import { approveTokenAndPostTransaction } from "../../redux/transaction";
import './styles.css'
import ClipLoader from "react-spinners/ClipLoader";
import { IFormDataProps } from "./IFormDataProps";
import { IApproveProps } from "./IApproveProps";
import { useNavigate } from "react-router-dom";

const Approve: FunctionComponent<IApproveProps> = (props: IApproveProps) => {
  const { processing } = props;

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/send");
  }, []);

  return (
    <div>
      {processing ? (
        <div className="statusContainer">
          <span>
            <ClipLoader size={25} className="spinner" />
          </span>
          <span className="textContainer">Processing transaction</span>
          <div className="statusText">This is step 2/4</div>
        </div>
      ) : (
        <div className="statusContainer">
          <div className="textContainer">
            <span>Waiting on approval</span>
            <div className="statusText">This is step 2/4</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapState = (state: any) => {
  return {
    formData: state.quote.form,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    approveTokenAndPostTransaction: (formData: IFormDataProps, route: any) =>
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

export default connect(mapState, mapDispatch)(Approve);
