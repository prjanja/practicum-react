import { createAction } from "@reduxjs/toolkit";
import { ingredientAPI } from "../../utils/endpoints";
import { request } from "../../utils/request";
import { Ingredient } from "../../utils/types";
import { ingredientsConstants } from "../action-types";
import { AppThunk } from "../store";

export const showIngredientDetails = createAction(
  ingredientsConstants.VIEW_INGREDIENT
);
export const hideIngredientDetails = createAction(
  ingredientsConstants.HIDE_INGREDIENT
);

export const getIngredientsStart = createAction(
  ingredientsConstants.INGREDIENTS_PENDING
);
export const getIngredientsEnd = createAction<Array<Ingredient>>(
  ingredientsConstants.INGREDIENTS_FULFILLED
);

export const getIngredientsAction = (): AppThunk => {
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
