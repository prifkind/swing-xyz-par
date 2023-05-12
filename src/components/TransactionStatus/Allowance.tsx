import React, { FunctionComponent, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { IAllowanceProps } from "./IAllowanceProps";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMetamaskApproval } from "../../redux/wallet";

const Allowance: FunctionComponent<IAllowanceProps> = (
  props: IAllowanceProps
) => {
  const { allowance, formData, metamaskApproval, processing, setProcessing } =
    props;

  const navigate = useNavigate();

  useEffect(() => {
    if (processing) {
      setProcessing(false);
    }
  }, []);

  const onApproveHandler = async () => {
    setProcessing(true);
    await metamaskApproval(
      formData.fromTokenAddress,
      formData.fromAddress,
      formData.amountWei,
      formData.decimals
    );
    navigate("/approval");
  };

  const onRejectHandler = () => {
    alert("Transaction Rejected");
    navigate("/");
  };

  if (processing) {
    return (
      <div>
        <span>
          <ClipLoader size={25} className="spinner" />
        </span>
        <div>Processing transaction</div>
        <div>This is step 2/4</div>
      </div>
    );
  } else
    return (
      <div>
        {" "}
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
            <br />
            <div>This is step 1/4</div>
          </div>
        </div>
      </div>
    );
};

const mapState = (state: any) => {
  return {
    allowance: state.allowance.allowance,
    formData: state.quote.form,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
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
export default connect(mapState, mapDispatch)(Allowance);
