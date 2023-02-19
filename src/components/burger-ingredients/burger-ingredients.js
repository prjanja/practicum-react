import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./burger-ingredients.module.css";
import { IngredientDetails } from "../ingredient-details";
import { Modal } from "../modal";
import { IngredientsContext } from "../../services/ingredientsContext";

const tabs = [
  { label: "Булки", value: "bun" },
  { label: "Соусы", value: "sauce" },
  { label: "Начинки", value: "main" },
];

export const BurgerIngredients = () => {
  const ingredientsList = useContext(IngredientsContext);
  const [currentTab, setCurrentTab] = useState("bun");
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const groupsRef = useRef({});

  useEffect(() => {
    if (groupsRef.current[currentTab]) {
      groupsRef.current[currentTab].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentTab]);

  const ingredientsGroups = useMemo(() => {
    let groups = {};
    for (const ingredient of ingredientsList) {
      if (!Array.isArray(groups[ingredient.type])) {
        groups[ingredient.type] = [];
      }
      groups[ingredient.type].push(ingredient);
    }
    return Object.entries(groups).map(([type, ingredientsArray]) => ({
      type,
      ingredientsArray,
    }));
  }, [ingredientsList]);

  const handleCloseModal = useCallback(() => setCurrentIngredient(null), []);

  return (
    <section className={styles.ingredients_wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Собери бургер</h1>
      <div className={classNames(styles.tabs, "mb-10")}>
        {tabs.map(({ label, value }) => (
          <Tab
            value={value}
            active={currentTab === value}
            key={value}
            onClick={setCurrentTab}
          >
            {label}
          </Tab>
        ))}
      </div>
      <div className={styles.ingredients_group_wrapper}>
        {ingredientsGroups.map((ingredientsGroups) => (
          <div
            key={ingredientsGroups.type}
            ref={(el) => (groupsRef.current[ingredientsGroups.type] = el)}
          >
            <div
              className={classNames("text text_type_main-medium", "mt-6 mb-10")}
            >
              {tabs.find((tab) => tab.value === ingredientsGroups.type).label}
            </div>
            <div className={classNames(styles.ingredients_list, "pl-4 pr-4")}>
              {ingredientsGroups.ingredientsArray.map((ingredient) => {
                return (
                  <div
                    key={ingredient._id}
                    className={classNames(styles.ingredient, "mb-8")}
                    onClick={() => setCurrentIngredient(ingredient)}
                  >
                    <div className="mr-4 ml-4">
                      <img
                        alt={`ingredient ${ingredient.name}`}
                        src={ingredient.image}
                      />
                    </div>
                    <div
                      className={classNames(
                        styles.ingredient_price,
                        "text text_type_digits-default",
                        "mt-1 mb-1"
                      )}
                    >
                      <span>{ingredient.price} </span> <CurrencyIcon />
                    </div>
                    <div className="text text_type_main-default">
                      {ingredient.name}
                    </div>
                    <Counter count={Math.floor(Math.random() * 5)} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {Boolean(currentIngredient) && (
        <Modal onClose={handleCloseModal} title={"Детали ингредиента"}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};
