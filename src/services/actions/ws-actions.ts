import { createAction } from "@reduxjs/toolkit";
import {
  APIOrderInfo
} from "../../utils/types";
import { wsConstants } from "../action-types";

export const wsInit = createAction<
  string,
  typeof wsConstants.WS_CONNECTION_START
>(wsConstants.WS_CONNECTION_START);
export const wsSendMessage = createAction(wsConstants.WS_SEND_MESSAGE);
export const wsOnOpen = createAction(wsConstants.WS_CONNECTION_SUCCESS);
export const wsOnClose = createAction(wsConstants.WS_CONNECTION_CLOSED);
export const wsOnError = createAction(wsConstants.WS_CONNECTION_ERROR);
export const wsOnMessage = createAction<
  Array<APIOrderInfo>,
  typeof wsConstants.WS_GET_MESSAGE
>(wsConstants.WS_GET_MESSAGE);
