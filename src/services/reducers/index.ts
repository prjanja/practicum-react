import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { feedReducer } from "./feed-info";
import { orderReducer } from "./order-details";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
});
