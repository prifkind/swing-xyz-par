import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import appReducer from "./redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

let middleware = [thunkMiddleware.withExtraArgument({ axios })];

if (typeof window !== "undefined") {
  middleware = [...middleware, createLogger({ collapsed: true })];
}

const RESET_STORE = "RESET_STORE";

export const resetStore = () => ({ type: RESET_STORE });
const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
    return appReducer(state, action);
  }
  return appReducer(state, action);
};

export default createStore(rootReducer, applyMiddleware(...middleware));
