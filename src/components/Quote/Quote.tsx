import React from "react";
import { FunctionComponent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles.css";
import { IQuoteProps } from "./IQuoteProps";
import { connect } from "react-redux";
import { fetchAllowance } from "../../redux/allowance";
import { IGetQuoteParams } from "../../services/IGetQuoteParams";
import { _selectRoute } from "../../redux/transaction";

const Quote: FunctionComponent<any> = (props: IQuoteProps) => {
  const {
    formData,
    getAllowance,
    processing,
    routes,
    setSelectedRoute,
    setTxInitiated,
    stale,
    txInitiated,
  } = props;

  const onInitiateHandler = async (nestedRoute: any) => {
    setTxInitiated(true);
    setSelectedRoute(nestedRoute);
    await getAllowance(formData, nestedRoute);
  };

  if (processing) {
    return (
      <div>
        <ClipLoader size={25} className="spinner" /> Getting quote...
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
    setSelectedRoute: (route: any) => dispatch(_selectRoute(route)),
    getAllowance: (formData: IGetQuoteParams, routes: any) =>
      dispatch(fetchAllowance(formData, routes)),
  };
};
export default connect(mapState, mapDispatch)(Quote);
