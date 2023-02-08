import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./burger-constructor.module.css";
import { igredientPropTypes } from "../../utils/types";
import { Modal } from "../modal";
import { OrderDetails } from "../order-details";

export const BurgerConstructor = ({ ingredientsList = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bun = useMemo(() => {
    return ingredientsList.find((i) => i.type === "bun");
  }, [ingredientsList]);

  const editableIngredients = useMemo(() => {
    return ingredientsList.filter((i) => i.type !== "bun");
  }, [ingredientsList]);

  const totalSum = useMemo(() => {
    return ingredientsList.reduce((acc, cur) => acc + cur.price, 0);
  }, [ingredientsList]);

  const handleCloseModal = useCallback(() => setIsModalOpen((v) => false), []);

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
          {editableIngredients.map((ingredient, idx) => (
            <div key={`${ingredient.id} + ${idx}`} className={styles.row}>
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
      <div className={classNames(styles.footer, "mb-10 mr-4 ml-4")}>
        <span className="text text_type_digits-medium">
          {totalSum} <CurrencyIcon />
        </span>
        <Button
          htmlType="button"
          size="large"
          extraClass="ml-10"
          onClick={() => setIsModalOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <OrderDetails order={{ id: "034536" }} />
      </Modal>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.arrayOf(igredientPropTypes),
};
