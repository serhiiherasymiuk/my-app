interface NotificationState {
  isShowed: boolean;
  message: string;
}
export enum NotificationActionTypes {
  SET_SHOWED = "SET_SHOWED",
  SET_MESSAGE = "SET_MESSAGE",
}
interface SetShowedNotificationAction {
  type: NotificationActionTypes.SET_SHOWED;
  payload: boolean;
}
interface SetMessageNotificationAction {
  type: NotificationActionTypes.SET_MESSAGE;
  payload: string;
}
export type NotificationSetShowed = SetShowedNotificationAction;
export type NotificationSetMessage = SetMessageNotificationAction;

const initState: NotificationState = {
  isShowed: false,
  message: "",
};

export const NotificationReducer = (
  state: NotificationState = initState,
  action: any
): NotificationState => {
  switch (action.type) {
    case NotificationActionTypes.SET_SHOWED:
      return { ...state, isShowed: action.payload };
    case NotificationActionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };
  }
  return state;
};
