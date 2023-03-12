import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import styles from "./burger-constructor.module.css";
import { Modal } from "../modal";
import { OrderDetails } from "../order-details";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createOrderAction } from "../../services/actions/order-details";
import {
  selectBurgerConstructorList,
  selectOrderDetails,
} from "../../services/selectors";
import { ingredientAdd } from "../../services/actions";
import { IngredientTypes } from "../../utils/ingredient-types";
import { BurgerConstructorItem } from "./burger-constructor-item";
import { selectIsUserAuthorized } from "../../services/selectors/user";

export const BurgerConstructor = () => {
  const ingredientsList = useAppSelector(selectBurgerConstructorList);
  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);
  const order = useAppSelector(selectOrderDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bun = useMemo(() => {
    return ingredientsList.find((i) => i.type === IngredientTypes.BUN);
  }, [ingredientsList]);

  const editableIngredients = useMemo(() => {
    return ingredientsList.filter((i) => i.type !== IngredientTypes.BUN);
  }, [ingredientsList]);

  const totalSum = useMemo(() => {
    return (
      editableIngredients.reduce((acc, cur) => acc + cur.price, 0) +
      (bun?.price || 0) * 2
    );
  }, [editableIngredients, bun]);

  const handleCloseModal = useCallback(() => setIsModalOpen((v) => false), []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    if (!isUserAuthorized) {
      navigate("/login");
    }

    return dispatch(createOrderAction()).then(() => setIsModalOpen(true));
  };

  const [{ canDrop }, dropRef] = useDrop(() => ({
    accept: "ingredient",
    drop(item) {
      dispatch(ingredientAdd({ ...item, uuid: uuidv4() }));
    },
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <section className={classNames(styles.constructor_wrapper, "pr-4 pl-4")}>
      <div
        className={classNames(
          styles.ingredients_wrapper,
          "mt-25 mb-10",
          canDrop && styles.ingredients_wrapper_active
        )}
        ref={dropRef}
      >
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
            <BurgerConstructorItem
              key={`${ingredient.uuid || ingredient.id}`}
              ingredient={ingredient}
              index={idx + Number(Boolean(bun))}
            />
          ))}
        </div>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
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
          onClick={handleCreateOrder}
          disabled={ingredientsList.length === 0}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </section>
  );
};
