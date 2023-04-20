import { Middleware } from "redux";
import {
  wsInit,
  wsSendMessage,
  wsOnOpen,
  wsOnClose,
  wsOnError,
  wsOnMessage,
} from "../actions/ws-actions";
import { RootState } from "../store";

export const socketMiddleware: Middleware<{}, RootState> = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;
    const { type } = action;

    if (type === wsInit.type) {
      socket = new WebSocket(action.payload);
    }

    if (socket) {
      socket.onopen = (event) => {
        dispatch(wsOnOpen());
      };

      socket.onerror = (event) => {
        dispatch(wsOnError());
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch(wsOnMessage(restParsedData));
      };

      if (wsSendMessage.match(type)) {
        socket.send(JSON.stringify(action.payload));
      }

      if(type === wsOnClose.type){
        socket.close();
      }
    }

    return next(action);
  };
};
