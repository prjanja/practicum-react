import classNames from "classnames";
import { AppHeader } from "../app-header";
import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";
import styles from "./app.module.css";

import { dummy } from "../../utils/data";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={classNames(styles.content, "pb-6")}>
        <BurgerIngredients ingredientsList={dummy} />
        <BurgerConstructor
          ingredientsList={[
            dummy[0],
            dummy[4],
            dummy[5],
            dummy[6],
            dummy[7],
            dummy[7],
          ]}
        />
      </main>
    </div>
  );
}

export default App;
