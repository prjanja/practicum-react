import { createReducer } from "@reduxjs/toolkit";
import { IngredientTypes } from "../../utils/ingredient-types";
import { constructorConstants } from "../action-types";

const initialState = [];

export const burgerConstructorReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(constructorConstants.INGREDIENT_ADD, (state, action) => {
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
      .addCase(constructorConstants.INGREDIENT_REMOVE, (state, action) => {
        state.splice(action.payload.idx, 1);
      })
      .addCase(constructorConstants.INGREDIENT_MOVE, (state, action) => {
        const { start, end } = action.payload;

        state.splice(end, 0, state.splice(start, 1)[0]);
      });
  }
);
