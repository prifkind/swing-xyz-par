import { combineReducers } from "redux";
import chainsReducer from "./tokens";

const appReducer = combineReducers({
  chains: chainsReducer,
});

export default appReducer;
