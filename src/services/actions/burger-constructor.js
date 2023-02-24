import { createAction } from "@reduxjs/toolkit";
import { constructorConstants } from "../action-types";

export const ingredientAdd = createAction(constructorConstants.INGREDIENT_ADD);
export const ingredientDelete = createAction(
  constructorConstants.INGREDIENT_REMOVE
);
export const ingredientMove = createAction(
  constructorConstants.INGREDIENT_MOVE
);
