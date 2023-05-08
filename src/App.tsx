import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import { IResponseRoute } from "./services/IResponseRoute";
import Quote from "./components/Quote/Quote";
import TransactionStatus from "./components/TransactionStatus/TransactionStatus";

function App() {
  const [allowance, setAllowance] = useState<number | string>(-1);
  const [formFields, setFormFields] = useState({});
  const [processing, setProcessing] = useState(false);
  const [quote, setQuote] = useState<IResponseRoute>({});
  const [txInitiated, setTxInitiated] = useState(false);

  return (
    <div className="App">
      <TransactionForm
        processing={processing}
        setFormFields={setFormFields}
        setProcessing={setProcessing}
        setQuote={setQuote}
      />
      {processing ? (
        <Quote
          allowance={allowance}
          formFields={formFields}
          processing={processing}
          quote={quote}
          setAllowance={setAllowance}
          setTxInitiated={setTxInitiated}
          txInitiated={txInitiated}
        />
      ) : null}
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
