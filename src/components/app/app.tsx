import { useEffect, useState } from "react";
import classNames from "classnames";
import { AppHeader } from "../app-header";
import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";
import styles from "./app.module.css";

import { ingredientAPI } from "../../utils/endpoints";

function App() {
  const [inregientsList, setInregientsList] = useState([]);

  useEffect(() => {
    fetch(ingredientAPI)
      .then((res) => res.json())
      .then((res) => setInregientsList(res.data))
      .catch((e) => {
        console.log(e?.message);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={classNames(styles.content, "pb-6")}>
        <BurgerIngredients ingredientsList={inregientsList} />
        <BurgerConstructor ingredientsList={inregientsList} />
      </main>
    </div>
  );
}

export default App;
