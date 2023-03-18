import classNames from "classnames";
import {  Ingredient } from "../../utils/types";
import styles from "./ingredient-details.module.css";

type OwnProps = {
  ingredient: Ingredient;
};

export const IngredientDetails = ({ ingredient }: OwnProps) => {
  return (
    <div className={classNames(styles.ingredient, "mb-8")}>
      <div className="mb-4">
        <img
          alt={`ingredient ${ingredient.name}`}
          src={ingredient.image_large}
        />
      </div>
      <div className={classNames("text text_type_main-default", "mb-8")}>
        {ingredient.name}
      </div>
      <div
        className={classNames(
          styles.nutrients,
          "text text_type_main-default  text_color_inactive"
        )}
      >
        <div>
          <div>Калории, ккал</div>
          <div>{ingredient.calories}</div>
        </div>
        <div>
          <div>Белки, г</div>
          <div>{ingredient.proteins}</div>
        </div>
        <div>
          <div>Жиры, г</div>
          <div>{ingredient.fat}</div>
        </div>
        <div>
          <div>Углеводы, г</div>
          <div>{ingredient.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
};
