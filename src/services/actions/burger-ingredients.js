import { createAction } from "@reduxjs/toolkit";
import { ingredientAPI } from "../../utils/endpoints";
import { ingredientsConstants } from "../action-types";

export const showIngredientDetails = createAction(ingredientsConstants.VIEW_INGREDIENT);
export const hideIngredientDetails = createAction(ingredientsConstants.HIDE_INGREDIENT);

const getIngredientsStart = createAction(
  ingredientsConstants.INGREDIENTS_PENDING
);
const getIngredientsEnd = createAction(
  ingredientsConstants.INGREDIENTS_FULFILLED
);

export const getIngredientsAction = () => {
  return (dispatch) => {
    dispatch(getIngredientsStart());

    return fetch(ingredientAPI)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch(getIngredientsEnd(res.data));
        } else {
          return Promise.reject(`Ошибка получения данных`);
        }
      })
      .catch((e) => {
        console.log(e?.message);
      });
  };
};
