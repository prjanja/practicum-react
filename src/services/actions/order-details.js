import { createAction } from "@reduxjs/toolkit";
import { orderAPI } from "../../utils/endpoints";
import { request } from "../../utils/request";
import { orderConstants } from "../action-types";

const createOrderStart = createAction(orderConstants.ORDER_PENDING);
const createOrderEnd = createAction(orderConstants.ORDER_FULFILLED);

export const createOrderAction = () => {
  return (dispatch, getState) => {
    dispatch(createOrderStart());
    const ingredientsList = getState().burgerIngredients.list;

    return request(orderAPI, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredientsList.map((igredient) => igredient._id),
      }),
      headers: {
        "Content-Type": "application/json",
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
