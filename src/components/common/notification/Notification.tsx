import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import "./Notification.scss";
import {
  NotificationSetShowed,
  NotificationActionTypes,
} from "../../../redux/reducers/notificationReducer";
import { store } from "../../../redux/store";

const Notification = () => {
  const { isShowed, message } = useSelector((store: any) => store.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShowed) {
      const timer = setTimeout(() => {
        const notificationAction: NotificationSetShowed = {
          payload: false,
          type: NotificationActionTypes.SET_SHOWED,
        };
        store.dispatch(notificationAction);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShowed, dispatch]);

  return (
    <>
      {isShowed && (
        <div className="notification">
          <div
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="mr-auto">Bootstrap</strong>
            </div>
            <div className="toast-body">{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
