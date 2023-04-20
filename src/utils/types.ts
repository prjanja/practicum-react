export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type IngredientWithCounter = Ingredient & { count: number };

export type APIOrderInfo = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};
export type OrderInfo = Omit<APIOrderInfo, "ingredients"> & {
  ingredients: Array<IngredientWithCounter>;
  total: number;
};
