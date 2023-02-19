import { useEffect, useState } from "react";
import classNames from "classnames";
import { AppHeader } from "../app-header";
import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";
import styles from "./app.module.css";

import { ingredientAPI } from "../../utils/endpoints";
import { IngredientsContext } from "../../services/ingredientsContext";
import { OrderContext } from "../../services/orderContext";

function App() {
  const [inregientsList, setInregientsList] = useState([]);
  const orderState = useState(null);

  useEffect(() => {
    fetch(ingredientAPI)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          setInregientsList(res.data);
        } else {
          return Promise.reject(`Ошибка получения данных`);
        }
      })
      .catch((e) => {
        console.log(e?.message);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={classNames(styles.content, "pb-6")}>
        <IngredientsContext.Provider value={inregientsList}>
          <OrderContext.Provider value={orderState}>
            <BurgerIngredients />
            <BurgerConstructor />
          </OrderContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;
