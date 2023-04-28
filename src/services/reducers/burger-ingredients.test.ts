import { burgerIngredientsReducer, initialState } from "./burger-ingredients";
import { ingredientsConstants, constructorConstants } from "../action-types";

const bun1 = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  count: 0,
};

const bun2 = {
  _id: "60666c42cc7b410027a1a9b2",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  count: 0,
};

const ingredient = {
  _id: "60666c42cc7b410027a1a9b5",
  name: "Говяжий метеорит (отбивная)",
  type: "main",
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: "https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
  count: 0,
};

describe("Burger ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle INGREDIENTS_FULFILLED", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: ingredientsConstants.INGREDIENTS_FULFILLED,
        payload: [ingredient],
      })
    ).toEqual({ ...initialState, list: [ingredient] });
  });
  it("should handle INGREDIENT_ADD", () => {
    expect(
      burgerIngredientsReducer(
        { ...initialState, list: [{ ...ingredient, count: 10 }] },
        {
          type: constructorConstants.INGREDIENT_ADD,
          payload: ingredient,
        }
      )
    ).toEqual({ ...initialState, list: [{ ...ingredient, count: 11 }] });

    expect(
      burgerIngredientsReducer(
        { ...initialState, list: [bun1, bun2] },
        {
          type: constructorConstants.INGREDIENT_ADD,
          payload: bun2,
        }
      )
    ).toEqual({ ...initialState, list: [bun1, { ...bun2, count: 2 }] });

    expect(
      burgerIngredientsReducer(
        { ...initialState, list: [{ ...bun1, count: 2 }, bun2] },
        {
          type: constructorConstants.INGREDIENT_ADD,
          payload: bun2,
        }
      )
    ).toEqual({
      ...initialState,
      list: [bun1, { ...bun2, count: 2 }],
    });
  });
  it("should handle INGREDIENT_REMOVE", () => {
    expect(
      burgerIngredientsReducer(
        { ...initialState, list: [{ ...ingredient, count: 10 }] },
        {
          type: constructorConstants.INGREDIENT_REMOVE,
          payload: {ingredient},
        }
      )
    ).toEqual({ ...initialState, list: [{ ...ingredient, count: 9 }] });
  });
});
