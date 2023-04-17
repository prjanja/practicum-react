import { IngredientWithCounter } from "../../utils/types";
import { RootState } from "../store";
import { selectBurgerIngredients } from "./burger-ingredients";

export const selectFeedOrderList = (state: RootState) => {
  const ingredientsList = selectBurgerIngredients(state);
  const orderList = state.feed.orders;

  return orderList
    .map((order) => {
      const ingredientGroups = new Map<string, IngredientWithCounter>();
      order.ingredients.forEach((ingredientId) => {
        const ingredientById = ingredientsList.find(
          (ingredient) => ingredient._id === ingredientId
        );

        if (ingredientById) {
          if (ingredientGroups.has(ingredientId)) {
            const ingredientFromGroup = ingredientGroups.get(
              ingredientId
            ) as IngredientWithCounter;

            ingredientGroups.set(ingredientId, {
              ...ingredientFromGroup,
              count: Number(ingredientFromGroup?.count || 0) + 1,
            });
          } else {
            ingredientGroups.set(ingredientId, {
              ...ingredientById,
              count: 1,
            });
          }
        }
      });

      return {
        ...order,
        ingredients: Array.from(ingredientGroups.values()),
      };
    })
    .map((order) => ({
      ...order,
      total: order.ingredients.reduce((acc, ingredient) => {
        return acc + ingredient.price * ingredient.count;
      }, 0),
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
