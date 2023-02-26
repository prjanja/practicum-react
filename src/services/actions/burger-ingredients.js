import { createAction } from "@reduxjs/toolkit";
import { ingredientAPI } from "../../utils/endpoints";
import { request } from "../../utils/request";
import { ingredientsConstants } from "../action-types";

export const showIngredientDetails = createAction(
  ingredientsConstants.VIEW_INGREDIENT
);
export const hideIngredientDetails = createAction(
  ingredientsConstants.HIDE_INGREDIENT
);

const getIngredientsStart = createAction(
  ingredientsConstants.INGREDIENTS_PENDING
);
const getIngredientsEnd = createAction(
  ingredientsConstants.INGREDIENTS_FULFILLED
);

export const getIngredientsAction = () => {
  return (dispatch) => {
    dispatch(getIngredientsStart());

    return request(ingredientAPI)
      .then((res) => {
        dispatch(getIngredientsEnd(res.data));
      })
      .catch((e) => {
        console.log(e?.message);
      });
  };
};
