import { combineReducers } from "redux";
import chainsReducer from "./chains";
import quoteReducer from "./quote";
import transactionReducer from "./transaction";
import allowanceReducer from "./allowance";
import walletReducer from "./wallet";

const appReducer = combineReducers({
  allowance: allowanceReducer,
  chains: chainsReducer,
  quote: quoteReducer,
  transaction: transactionReducer,
  wallet: walletReducer
});

export default appReducer;
