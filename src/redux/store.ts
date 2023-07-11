import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoryReducer from "./category";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import { IsLoadingReducer } from "./reducers/isLoadingReducer";
import { NotificationReducer } from "./reducers/notificationReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, categoryReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  devTools: true,
  reducer: {
    categories: persistedReducer,
    auth: AuthReducer,
    loading: IsLoadingReducer,
    notification: NotificationReducer,
  },
  middleware: [thunk],
});

const persistor = persistStore(store);

export { persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
