import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { ICompleteProps } from "./ICompleteProps";

const Complete: FunctionComponent<ICompleteProps> = (props: ICompleteProps) => {
  const { transaction } = props;

  useEffect(() => {
    console.log(transaction.tx)
  })
  return (
    <div>
      <div>Transaction complete</div>
      <div>Hash: {transaction.tx}</div>
    </div>
  );
};

const mapState = (state: any) => {
  return {
    transaction: state.transaction.transaction,
  };
};

export default connect(mapState, null)(Complete);
