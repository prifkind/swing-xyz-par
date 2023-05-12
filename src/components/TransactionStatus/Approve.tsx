import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getMetamaskApproval } from "../../redux/wallet";
import { approveTokenAndPostTransaction } from "../../redux/transaction";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
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
        <div>
          <span>
            <ClipLoader size={25} className="spinner" />
          </span>
          <span>Processing transaction</span>
          <span>This is step 2/4</span>
        </div>
      ) : (
        <div>
          <span>Waiting on approval</span>
          <div>This is step 2/4</div>
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

export default connect(mapState, mapDispatch)(Approve);
