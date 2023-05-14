import React, { FunctionComponent, useEffect, useState } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { ICompleteProps } from "./ICompleteProps";
import { useNavigate } from "react-router-dom";
import { _setRoutes } from "../../redux/quote";

const Complete: FunctionComponent<ICompleteProps> = (props: ICompleteProps) => {
  const { setRoutes, transaction } = props;
  const [txId, setTxId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (transaction.tx && transaction.tx.txId) setTxId(transaction.tx.txId);
    setRoutes([]);
  }, [transaction]);


  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <div className="statusContainer">
      <div className="textContainer">
        <span>Transaction complete</span>
        <div>Transaction hash:{txId}</div>
        <div className="statusText">This is step 4/4</div>
      </div>
      <button onClick={onClickHandler}>Go Home</button>
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
    setRoutes: () => dispatch(_setRoutes()),
  };
};

export default connect(mapState, mapDispatch)(Complete);
