import { useCallback, useContext, useMemo, useState } from "react";
import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./burger-constructor.module.css";
import { Modal } from "../modal";
import { OrderDetails } from "../order-details";
import { IngredientsContext } from "../../services/ingredientsContext";
import { OrderContext } from "../../services/orderContext";
import { orderAPI } from "../../utils/endpoints";

export const BurgerConstructor = () => {
  const ingredientsList = useContext(IngredientsContext);
  const [order, setOrder] = useContext(OrderContext);
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

  const handleCreateOrder = () => {
    return fetch(orderAPI, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredientsList.map((igredient) => igredient._id),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          console.log(res.order);
          setOrder(res.order);
        } else {
          return Promise.reject(`Ошибка получения данных`);
        }
      })
      .then(() => setIsModalOpen(true))
      .catch((e) => {
        console.log(e?.message);
      });
  };

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
          onClick={handleCreateOrder}
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
