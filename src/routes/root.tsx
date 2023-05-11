import React, { FunctionComponent } from "react";
import "./styles.css";
import { Link } from "react-router-dom";


const Root: FunctionComponent = () => {
  return <div>
    <Link to={'transaction/1'}>Click to start transaction</Link>
  </div>;
};

export default Root;
