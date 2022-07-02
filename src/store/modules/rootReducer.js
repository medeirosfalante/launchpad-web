import { combineReducers } from "redux";

import wallet from "./wallet/reducers";

const reducers = combineReducers({
  wallet,
});

export default reducers;
