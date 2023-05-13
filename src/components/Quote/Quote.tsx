import React from "react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllowance } from "../../redux/allowance";
import { _selectRoute } from "../../redux/transaction";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";
import { IQuoteProps } from "./IQuoteProps";
import { IFormDataProps } from "../TransactionStatus/IFormDataProps";

const Quote: FunctionComponent<any> = (props: IQuoteProps) => {
  const {
    formData,
    getAllowance,
    processing,
    routes,
    setProcessing,
    setSelectedRoute,
    setTxInitiated,
    stale,
    txInitiated,
  } = props;

  const navigate = useNavigate();

  const onInitiateHandler = async (nestedRoute: any) => {
    setProcessing(true);
    setTxInitiated(true);
    setSelectedRoute(nestedRoute);

    await getAllowance(formData, nestedRoute);

    setProcessing(false);
    setTxInitiated(false);
    navigate("/allowance");
  };

  if (processing) {
    return (
      <div>
        <ClipLoader size={25} className="spinner" /> Processing...
      </div>
    );
  } else if (stale) {
    return null;
  } else {
    return (
      <div>
        {routes.map((route: any, index) => {
          return (
            <div className="quoteContainer" key={index}>
              <h1 className="quoteHeader">Quote Details</h1>
              {route.route.map((nestedRoute: any, index: number) => {
                return (
                  <div key={index}>
                    Bridge {index}: {nestedRoute.bridge}
                    <div>Bridge Fee: {route.quote.bridgeFee}</div>
                    <div>Gas: {route.gas}</div>
                    <div>Gas USD: {route.gasUSD}</div>
                    {txInitiated ? null : (
                      <div>
                        <button
                          onClick={() => onInitiateHandler(nestedRoute)}
                          className="transferButton"
                        >
                          Initiate Transfer
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
};

const mapState = (state: any) => {
  return {
    chains: state.chains.chains,
    formData: state.quote.form,
    routes: state.quote.routes,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    getAllowance: (formData: IFormDataProps, routes: any) =>
      dispatch(fetchAllowance(formData, routes)),
    setSelectedRoute: (route: any) => dispatch(_selectRoute(route)),
  };
};
export default connect(mapState, mapDispatch)(Quote);
