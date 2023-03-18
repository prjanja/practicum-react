import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useDrag } from "react-dnd";
import styles from "./burger-ingredients.module.css";
import {
  Ingredient as TIngredient,
} from "../../utils/types";

type OwnProps = {
  ingredient: TIngredient & { count: number };
  onClick: () => void;
};

export const Ingredient = ({ ingredient, onClick }: OwnProps) => {
  const [, dragRef] = useDrag(
    () => ({
      type: "ingredient",
      item: ingredient,
    }),
    []
  );

  return (
    <div
      className={classNames(styles.ingredient, "mb-8")}
      onClick={onClick}
      ref={dragRef}
    >
      <div className="mr-4 ml-4">
        <img alt={`ingredient ${ingredient.name}`} src={ingredient.image} />
      </div>
      <div
        className={classNames(
          styles.ingredient_price,
          "text text_type_digits-default",
          "mt-1 mb-1"
        )}
      >
        <span>{ingredient.price} </span> <CurrencyIcon type="primary" />
      </div>
      <div className="text text_type_main-default">{ingredient.name}</div>
      <Counter count={ingredient.count} />
    </div>
  );
};
