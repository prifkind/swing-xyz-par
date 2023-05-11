import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchChains } from "./redux/tokens";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import Quote from "./components/Quote/Quote";
import { IResponseRoute } from "./services/IResponseRoute";
import TransactionStatus from "./components/TransactionStatus/TransactionStatus";

function App(props:any) {
  const {getChains} = props
  const [allowance, setAllowance] = useState<number | string>(-1);
  const [processing, setProcessing] = useState(false);
  const [quote, setQuote] = useState<IResponseRoute>({});
  const [stale, setStale] = useState(true);
  const [txInitiated, setTxInitiated] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    fromAddress: "",
    fromChain: "",
    fromToken: "",
    toAddress: "",
    toChain: "",
    toToken: "",
  });

  useEffect(() => {
    getChains();
  },[])

  return (
    <div className="App">
      <TransactionForm
        formData={formData}
        processing={processing}
        setAllowance={setAllowance}
        setFormData={setFormData}
        setProcessing={setProcessing}
        setQuote={setQuote}
        setStale={setStale}
        setTxInitiated={setTxInitiated}
      />

      <Quote
        formData={formData}
        processing={processing}
        quote={quote}
        setAllowance={setAllowance}
        setFormData={setFormData}
        setTxInitiated={setTxInitiated}
        stale={stale}
        txInitiated={txInitiated}
      />

      {+allowance > -1 ? (
        <TransactionStatus
          allowance={allowance}
          formData={formData}
          setAllowance={setAllowance}
          setTxInitiated={setTxInitiated}
          quote={quote}
        />
      ) : null}
    </div>
  );
}

const mapState = (state: any) => {
  return {
    chains: state.chains.chains,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    getChains: () => dispatch(fetchChains()),
  };
};

export default connect(mapState, mapDispatch)(App);
