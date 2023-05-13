import React, { FunctionComponent, useEffect } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { ICompleteProps } from "./ICompleteProps";
import { Link } from "react-router-dom";
import { _setRoutes } from "../../redux/quote";

const Complete: FunctionComponent<ICompleteProps> = (props: ICompleteProps) => {
  const { setRoutes, transaction } = props;

  console.log(transaction);

  useEffect(() => {
    setRoutes();
  },[]);

  return (
    <div className="statusContainer">
      <div className="textContainer">
        <span>Transaction complete</span>
        <div>Transaction hash: {transaction.tx ? transaction.tx : null}</div>
        <div className="statusText">This is step 4/4</div>
      </div>
      <Link to="/">Go Home</Link>
    </div>
  );
};

const mapState = (state: any) => {
  return {
    routes: state.quote.routes,
    transaction: state.transaction.transaction,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    setRoutes: () => _setRoutes(),
  };
};

export default connect(mapState, mapDispatch)(Complete);
