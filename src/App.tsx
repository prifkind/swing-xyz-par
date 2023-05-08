import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import { IResponseRoute } from "./services/IResponseRoute";
import Quote from "./components/Quote/Quote";

function App() {
  const [processing, setProcessing] = useState(false);
  const [quote, setQuote] = useState<IResponseRoute>({});

  return (
    <div className="App">
      <TransactionForm
        processing={processing}
        setProcessing={setProcessing}
        setQuote={setQuote}
      />
      <Quote quote={quote} />
    </div>
  );
}

export default App;
