import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./burger-constructor.module.css";

export const BurgerConstructor = ({ ingredientsList = [] }) => {
  const bun = useMemo(() => {
    return ingredientsList.find((i) => i.type === "bun");
  }, [ingredientsList]);

  const editableIngredients = useMemo(() => {
    return ingredientsList.filter((i) => i.type !== "bun");
  }, [ingredientsList]);

  const totalSum = useMemo(() => {
    return ingredientsList.reduce((acc, cur) => acc + cur.price, 0);
  }, [ingredientsList]);

  return (
    <section className={classNames(styles.constructor_wrapper, "pr-4 pl-4")}>
      <div className={classNames(styles.ingredients_wrapper, "mt-25 mb-10")}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={classNames(styles.locked_row, "ml-10")}
          />
        )}
        <div className={styles.editableItems_wrapper}>
          {editableIngredients.map((ingredient) => (
            <div className={styles.row}>
              <div className={styles.drag_icon}>
                <DragIcon />
              </div>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={classNames(styles.locked_row, "ml-10")}
          />
        )}
      </div>
      <div className={classNames(styles.footer, "mb-10")}>
        <span className="text text_type_main-medium">
          {totalSum} <CurrencyIcon />
        </span>
        <Button size="large" extraClass="ml-10">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
    })
  ),
};
