import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor } from "../../components/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients";

export const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};
