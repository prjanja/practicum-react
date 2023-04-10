import { createAction } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookie";
import { orderAPI } from "../../utils/endpoints";
import { request } from "../../utils/request";
import { orderConstants } from "../action-types";
import { selectBurgerConstructorList } from "../selectors";
import { AppThunk } from "../store";

export const createOrderStart = createAction(orderConstants.ORDER_PENDING);
export const createOrderEnd = createAction(orderConstants.ORDER_FULFILLED);

export const createOrderAction = (): AppThunk<Promise<void>> => {
  return (dispatch, getState) => {
    dispatch(createOrderStart());
    const token = getCookie("accessToken");
    const ingredientsList = selectBurgerConstructorList(getState());

    return request(orderAPI, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredientsList.map((igredient) => igredient._id),
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    })
      .then((res) => {
        dispatch(createOrderEnd(res.order));
      })
      .catch((e) => {
        console.log(e?.message);
      });
  };
};
