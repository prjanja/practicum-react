import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components/ingredient-details";
import { useAppSelector } from "../hooks";
import { selectBurgerIngredients } from "../services/selectors";
import styles from "./styles.module.css";

export const IngredientPage = () => {
  const { id } = useParams();
  const ingredient = useAppSelector(selectBurgerIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.page_centered_content}>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
