import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import persistReducers from "./persistReducers";




const development = process.env.NODE_ENV === "development";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composer = development
  ? compose(applyMiddleware(...middlewares))
  : applyMiddleware(...middlewares);


const store = createStore(persistReducers(rootReducer), composer);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);


export { store, persistor };
