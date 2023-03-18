import { createAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";
import { constructorConstants } from "../action-types";

export const ingredientAdd = createAction<
  Ingredient & {
    uuid?: string;
  }
>(constructorConstants.INGREDIENT_ADD);
export const ingredientDelete = createAction<{
  idx: number;
  ingredient: Ingredient;
}>(constructorConstants.INGREDIENT_REMOVE);
export const ingredientMove = createAction<{ start: number; end: number }>(
  constructorConstants.INGREDIENT_MOVE
);
