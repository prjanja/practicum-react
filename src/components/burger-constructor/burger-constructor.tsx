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
import { Ingredient } from "../../utils/types";

export const BurgerConstructor = () => {
  const ingredientsList = useAppSelector<
    Array<
      Ingredient & {
        uuid?: string;
      }
    >
  >(selectBurgerConstructorList);
  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);
  const order = useAppSelector(selectOrderDetails) as { number: string };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bun = useMemo(() => {
    return ingredientsList.find((i) => i.type === IngredientTypes.BUN);
  }, [ingredientsList]);

  const editableIngredients = useMemo(() => {
    return ingredientsList.filter((i) => i.type !== IngredientTypes.BUN);
  }, [ingredientsList]);

  const totalSum = useMemo(() => {
    return (
      editableIngredients.reduce((acc: number, cur) => acc + cur.price, 0) +
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
    setIsLoading(true);

    return dispatch(createOrderAction()).then(() => {
      setIsModalOpen(true);
      setIsLoading(false);
    });
  };

  const [{ canDrop }, dropRef] = useDrop<
    Ingredient,
    void,
    { canDrop: boolean }
  >(() => ({
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
        <div
          className={classNames(
            styles.editableItems_wrapper,
            "custom-scrollbar"
          )}
        >
          {editableIngredients.map((ingredient, idx: number) => (
            <BurgerConstructorItem
              key={`${ingredient.uuid || ingredient._id}`}
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
          {totalSum} <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          size="large"
          extraClass="ml-10"
          onClick={handleCreateOrder}
          disabled={ingredientsList.length === 0 || isLoading}
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
