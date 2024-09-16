import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { cartSlice } from "./cartSlice";
import { shopppingCartApi } from "../api/api";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [shopppingCartApi.reducerPath],
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  [shopppingCartApi.reducerPath]: shopppingCartApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(shopppingCartApi.middleware),
});

export let persistor = persistStore(store);
export default store;
