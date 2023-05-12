import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchChains } from "./redux/chains";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import Quote from "./components/Quote/Quote";
import TransactionStatus from "./components/TransactionStatus/TransactionStatus";

function App(props: any) {
  const { allowance, getChains } = props;
  const [processing, setProcessing] = useState(false);
  const [stale, setStale] = useState(true);
  const [txInitiated, setTxInitiated] = useState(false);

  useEffect(() => {
    getChains();
  },[]);

  return (
    <div className="App">
      <TransactionForm
        processing={processing}
        setProcessing={setProcessing}
        setStale={setStale}
        setTxInitiated={setTxInitiated}
      />
      <Quote
        processing={processing}
        setTxInitiated={setTxInitiated}
        stale={stale}
        txInitiated={txInitiated}
      />
      {+allowance.allowance >= 0 ? (
        <TransactionStatus setTxInitiated={setTxInitiated} />
      ) : null}
    </div>
  );
}

const mapState = (state: any) => {
  return {
    chains: state.chains.chains,
    allowance: state.allowance.allowance,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    getChains: () => dispatch(fetchChains()),
  };
};

export default connect(mapState, mapDispatch)(App);
