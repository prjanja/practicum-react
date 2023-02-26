import { createReducer } from "@reduxjs/toolkit";
import { IngredientTypes } from "../../utils/ingredient-types";
import { constructorConstants, ingredientsConstants } from "../action-types";

const initialState = {
  list: [],
  currentElement: null,
};

export const burgerIngredientsReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(ingredientsConstants.INGREDIENTS_FULFILLED, (state, action) => {
        state.list = action.payload;
      })
      .addCase(constructorConstants.INGREDIENT_ADD, (state, action) => {
        let currentIngredient = state.list.find(
          (e) => e._id === action.payload._id
        );
        if (currentIngredient?.type === IngredientTypes.BUN) {
          let currentBun = state.list.find(
            (e) => e.type === IngredientTypes.BUN && e.count > 0
          );
          if (currentBun) currentBun.count = 0;
          currentIngredient.count = 2;
        } else {
          currentIngredient.count = (currentIngredient.count || 0) + 1;
        }
      })
      .addCase(constructorConstants.INGREDIENT_REMOVE, (state, action) => {
        let currentIngredient = state.list.find(
          (e) => e._id === action.payload.ingredient._id
        );
        currentIngredient.count = currentIngredient.count - 1;
      });
  }
);
