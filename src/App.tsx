import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm/TransactionForm";

function App() {
  const [processing, setProcessing] = useState(false);
  return (
    <div className="App">
      <TransactionForm processing={processing} setProcessing={setProcessing} />
    </div>
  );
}

export default App;
