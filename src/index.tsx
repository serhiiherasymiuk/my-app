import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { IUser, AuthUserActionType } from "./interfaces/user";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (localStorage.token) {
  const token = localStorage.token;
  var user = jwtDecode(token) as IUser;
  store.dispatch({
    type: AuthUserActionType.LOGIN_USER,
    payload: {
      email: user.email,
      name: user.name,
    },
  });
}

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
