import { useEffect } from "react";
import classNames from "classnames";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader } from "../app-header";
import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";
import styles from "./app.module.css";

import { getIngredientsAction } from "../../services/actions/burger-ingredients";
import { useAppDispatch } from "../../hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={classNames(styles.content, "pb-6")}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
