import { RootState } from "../store";

export const selectBurgerIngredients = (state: RootState) => state.burgerIngredients.list;
