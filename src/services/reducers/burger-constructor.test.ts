import { burgerConstructorReducer } from "./burger-constructor";
import { constructorConstants } from "../action-types";

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
  __v: 0,
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
  __v: 0,
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
  __v: 0,
};

describe("Burger Constructor reducer", () => {
  it("should return the initial state", () => {
    expect(burgerConstructorReducer(undefined, { type: undefined })).toEqual(
      []
    );
  });

  it("should handle INGREDIENT_ADD", () => {
    expect(
      burgerConstructorReducer([], {
        type: constructorConstants.INGREDIENT_ADD,
        payload: bun1,
      })
    ).toEqual([bun1]);

    expect(
      burgerConstructorReducer([bun1], {
        type: constructorConstants.INGREDIENT_ADD,
        payload: ingredient,
      })
    ).toEqual([bun1, ingredient]);

    expect(
      burgerConstructorReducer([bun1, ingredient], {
        type: constructorConstants.INGREDIENT_ADD,
        payload: bun2,
      })
    ).toEqual([bun2, ingredient]);
  });

  it("should handle INGREDIENT_REMOVE", () => {
    expect(
      burgerConstructorReducer([bun1, ingredient, bun2], {
        type: constructorConstants.INGREDIENT_REMOVE,
        payload: {
          idx: 1,
        },
      })
    ).toEqual([bun1, bun2]);
  });

  it("should handle INGREDIENT_MOVE", () => {
    expect(
      burgerConstructorReducer([bun1, ingredient, bun2], {
        type: constructorConstants.INGREDIENT_MOVE,
        payload: {
          start: 0,
          end: 2,
        },
      })
    ).toEqual([ingredient, bun2, bun1]);
  });
});
