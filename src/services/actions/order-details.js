import { createAction } from "@reduxjs/toolkit";
import { orderAPI } from "../../utils/endpoints";
import { orderConstants } from "../action-types";

const createOrderStart = createAction(orderConstants.ORDER_PENDING);
const createOrderEnd = createAction(orderConstants.ORDER_FULFILLED);

export const createOrderAction = () => {
  return (dispatch, getState) => {
    dispatch(createOrderStart());
    const ingredientsList = getState().burgerIngredients.list;

    return fetch(orderAPI, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredientsList.map((igredient) => igredient._id),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch(createOrderEnd(res.order));
        } else {
          return Promise.reject(`Ошибка получения данных`);
        }
      })
      .catch((e) => {
        console.log(e?.message);
      });
  };
};
