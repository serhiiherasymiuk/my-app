import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoryReducer from "./category";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, categoryReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    categories: persistedReducer,
  },
  middleware: customizedMiddleware,
});

const persistor = persistStore(store);

export { persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
