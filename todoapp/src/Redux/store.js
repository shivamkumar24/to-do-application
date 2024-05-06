import { thunk } from "redux-thunk";
import reducer from "./reducer";
import { legacy_createStore, applyMiddleware, compose } from "redux";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);
