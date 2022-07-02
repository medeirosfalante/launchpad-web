import { all, takeLatest, fork } from "redux-saga/effects";

import wallet from "./wallet/sagas";

export default function* rootSaga() {
  yield all([
    wallet,
  ]);
}
