import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import Quote from "./components/Quote/Quote";
import { IResponseRoute } from "./services/IResponseRoute";
import TransactionStatus from "./components/TransactionStatus/TransactionStatus";

function App() {
  const [allowance, setAllowance] = useState<number | string>(-1);
  const [formFields, setFormFields] = useState({});
  const [processing, setProcessing] = useState(false);
  const [quote, setQuote] = useState<IResponseRoute>({});
  const [stale, setStale] = useState(true);
  const [txInitiated, setTxInitiated] = useState(false);

  return (
    <div className="App">
      <TransactionForm
        processing={processing}
        setFormFields={setFormFields}
        setProcessing={setProcessing}
        setQuote={setQuote}
        setStale={setStale}
      />

      <Quote
        formFields={formFields}
        processing={processing}
        quote={quote}
        setAllowance={setAllowance}
        setTxInitiated={setTxInitiated}
        stale={stale}
        txInitiated={txInitiated}
      />

      {+allowance > -1 ? (
        <TransactionStatus
          allowance={allowance}
          formFields={formFields}
          setAllowance={setAllowance}
          quote={quote}
        />
      ) : null}
    </div>
  );
}

export default App;
