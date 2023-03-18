import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./burger-ingredients.module.css";
import { selectBurgerIngredients } from "../../services/selectors";
import { Ingredient } from "./ingredient";
import { IngredientTypes } from "../../utils/ingredient-types";
import { Ingredient as TIngredient } from "../../utils/types";
import { useAppSelector } from "../../hooks";

const tabs = [
  { label: "Булки", value: IngredientTypes.BUN },
  { label: "Соусы", value: IngredientTypes.SAUCE },
  { label: "Начинки", value: IngredientTypes.MAIN },
];

type BoolDictionary = { [key: string]: boolean };
type IngredientWithCounter = TIngredient & { count: number };

export const BurgerIngredients = () => {
  const ingredientsList = useAppSelector(
    selectBurgerIngredients
  ) as Array<IngredientWithCounter>;
  const [currentTab, setCurrentTab] = useState(IngredientTypes.BUN);
  const groupsRef = useRef<{ [key: string]: HTMLDivElement }>({});
  const visibleGroups = useRef<BoolDictionary>({} as BoolDictionary);
  const navigate = useNavigate();
  const location = useLocation();

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          visibleGroups.current[String(target.dataset["groupType"])] =
            entry.isIntersecting;
        }

        for (let group in visibleGroups.current) {
          if (visibleGroups.current[group]) {
            setCurrentTab(group);
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
    (type: string) => (node: HTMLDivElement) => {
      if (node && !groupsRef.current[type]) {
        observer.current.observe(node);
        groupsRef.current[type] = node;
      }
    },
    []
  );

  const ingredientsGroups = useMemo<
    Array<{
      type: string;
      ingredientsArray: Array<IngredientWithCounter>;
    }>
  >(() => {
    let groups: { [key: string]: Array<IngredientWithCounter> } = {};
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
              {tabs.find((tab) => tab.value === ingredientsGroups.type)?.label}
            </div>
            <div className={classNames(styles.ingredients_list, "pl-4 pr-4")}>
              {ingredientsGroups.ingredientsArray.map((ingredient) => {
                return (
                  <Ingredient
                    key={ingredient._id}
                    ingredient={ingredient}
                    onClick={() => {
                      navigate(`/ingredients/${ingredient._id}`, {
                        state: { background: location },
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
