import { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./burger-ingredients.module.css";
import { IngredientDetails } from "../ingredient-details";
import { Modal } from "../modal";
import { selectBurgerIngredients } from "../../services/selectors";
import { Ingredient } from "./ingredient";
import { IngredientTypes } from "../../utils/ingredient-types";

const tabs = [
  { label: "Булки", value: IngredientTypes.BUN },
  { label: "Соусы", value: IngredientTypes.SAUCE },
  { label: "Начинки", value: IngredientTypes.MAIN },
];

export const BurgerIngredients = () => {
  const ingredientsList = useSelector(selectBurgerIngredients);
  const [currentTab, setCurrentTab] = useState(IngredientTypes.BUN);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const groupsRef = useRef({});

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrentTab(entry.target.dataset["groupType"]);
            break;
          }
        }
      },
      {
        threshold: 0.5,
      }
    )
  );

  const setRef = useCallback(
    (type) => (node) => {
      if (node && !groupsRef.current[type]) {
        observer.current.observe(node);
        groupsRef.current[type] = node;
      }
    },
    []
  );

  const ingredientsGroups = useMemo(() => {
    let groups = {};
    for (const ingredient of ingredientsList) {
      if (!Array.isArray(groups[ingredient.type])) {
        groups[ingredient.type] = [];
      }
      groups[ingredient.type].push(ingredient);
    }

    return tabs.map((tab) => ({
      type: tab.value,
      ingredientsArray: groups[tab.value] || [],
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
            onClick={() => {
              groupsRef.current[value].scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {label}
          </Tab>
        ))}
      </div>
      <div className={styles.ingredients_group_wrapper}>
        {ingredientsGroups.map((ingredientsGroups) => (
          <div
            key={ingredientsGroups.type}
            ref={setRef(ingredientsGroups.type)}
            // специально добавляем кастомный атрибут
            data-group-type={ingredientsGroups.type}
          >
            <div
              className={classNames("text text_type_main-medium", "mt-6 mb-10")}
            >
              {tabs.find((tab) => tab.value === ingredientsGroups.type).label}
            </div>
            <div className={classNames(styles.ingredients_list, "pl-4 pr-4")}>
              {ingredientsGroups.ingredientsArray.map((ingredient) => {
                return (
                  <Ingredient
                    key={ingredient._id}
                    ingredient={ingredient}
                    onClick={() => setCurrentIngredient(ingredient)}
                  />
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
