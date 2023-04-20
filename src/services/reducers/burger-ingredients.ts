import { createReducer } from "@reduxjs/toolkit";
import { IngredientTypes } from "../../utils/ingredient-types";
import { Ingredient } from "../../utils/types";
import { getIngredientsEnd, ingredientAdd, ingredientDelete } from "../actions";

type IngredientWithCount = Ingredient & { count?: number };

const initialState: {
  list: Array<IngredientWithCount>;
  currentElement: IngredientWithCount | null;
} = {
  list: [],
  currentElement: null,
};

export const burgerIngredientsReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(getIngredientsEnd, (state, action) => {
        state.list = action.payload;
      })
      .addCase(ingredientAdd, (state, action) => {
        let currentIngredient = state.list.find(
          (e) => e._id === action.payload._id
        );
        if (currentIngredient?.type === IngredientTypes.BUN) {
          let currentBun = state.list.find(
            (e) => e.type === IngredientTypes.BUN && Number(e.count) > 0
          );
          if (currentBun) currentBun.count = 0;
          currentIngredient.count = 2;
        } else if (currentIngredient) {
          currentIngredient.count = (currentIngredient.count || 0) + 1;
        }
      })
      .addCase(ingredientDelete, (state, action) => {
        let currentIngredient = state.list.find(
          (e) => e._id === action.payload.ingredient._id
        );
        if (currentIngredient)
          currentIngredient.count = currentIngredient.count! - 1;
      });
  }
);
