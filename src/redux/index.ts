import { combineReducers } from "redux";
import chainsReducer from "./chains";
import quoteReducer from "./quote";
import transactionReducer from "./transaction";
import allowanceReducer from "./allowance";

const appReducer = combineReducers({
  allowance: allowanceReducer,
  chains: chainsReducer,
  quote: quoteReducer,
  transaction: transactionReducer,
});

export default appReducer;
