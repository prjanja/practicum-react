import { createReducer } from "@reduxjs/toolkit";
import { IngredientTypes } from "../../utils/ingredient-types";
import { Ingredient } from "../../utils/types";
import { ingredientAdd, ingredientDelete, ingredientMove } from "../actions";

const initialState: Array<Ingredient> = [];

export const burgerConstructorReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(ingredientAdd, (state, action) => {
        let currentBunIdx = state.findIndex(
          (e) => e.type === IngredientTypes.BUN
        );

        if (
          action.payload.type === IngredientTypes.BUN &&
          currentBunIdx !== -1
        ) {
          state[currentBunIdx] = action.payload;
        } else {
          state.push(action.payload);
        }
      })
      .addCase(ingredientDelete, (state, action) => {
        state.splice(action.payload.idx, 1);
      })
      .addCase(ingredientMove, (state, action) => {
        const { start, end } = action.payload;

        state.splice(end, 0, state.splice(start, 1)[0]);
      });
  }
);
