import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchChains } from "./redux/chains";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import Quote from "./components/Quote/Quote";
import Allowance from "./components/TransactionStatus/Allowance";
import Approve from "./components/TransactionStatus/Approve";
import Send from "./components/TransactionStatus/Send";
import Complete from "./components/TransactionStatus/Complete";

function App(props: any) {
  const { getChains } = props;
  const [approving, setApproving] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [stale, setStale] = useState(true);
  const [txInitiated, setTxInitiated] = useState(false);

  useEffect(() => {
    getChains();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {" "}
              <TransactionForm
                processing={processing}
                setProcessing={setProcessing}
                setStale={setStale}
                setTxInitiated={setTxInitiated}
              />
              {processing ? (
                <div>
                  <ClipLoader size={25} className="spinner" /> Processing...
                </div>
              ) : (
                <Quote
                  processing={processing}
                  setProcessing={setProcessing}
                  setTxInitiated={setTxInitiated}
                  stale={stale}
                  txInitiated={txInitiated}
                />
              )}
            </div>
          }
        />
        <Route
          path="allowance"
          element={
            <Allowance
              approving={approving}
              processing={processing}
              setApproving={setApproving}
              setProcessing={setProcessing}
            />
          }
        />
        <Route
          path="approval"
          element={
            <Approve
              approving={approving}
              setApproving={setApproving}
              processing={processing}
              setProcessing={setProcessing}
            />
          }
        />
        <Route
          path="/send"
          element={
            <Send processing={processing} setProcessing={setProcessing} />
          }
        />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </Router>
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
