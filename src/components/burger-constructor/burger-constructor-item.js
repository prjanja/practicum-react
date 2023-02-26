import { useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch } from "../../hooks";
import { ingredientDelete, ingredientMove } from "../../services/actions";
import styles from "./burger-constructor.module.css";
import classNames from "classnames";
import { igredientPropTypes } from "../../utils/types";

export const BurgerConstructorItem = ({ ingredient, index }) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [{ isOver, direction }, dropRef] = useDrop(() => ({
    accept: "ingredient_sort",
    drop(item) {
      if (item.index !== index)
        dispatch(ingredientMove({ start: item.index, end: index }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      direction: !!monitor
        ? monitor.getDifferenceFromInitialOffset()?.y < 0
          ? "up"
          : "down"
        : null,
    }),
  }));

  const [, dragRef] = useDrag(
    () => ({
      type: "ingredient_sort",
      item: { index },
    }),
    []
  );

  dragRef(dropRef(ref));

  return (
    <div
      className={classNames(
        styles.row,
        isOver && direction === "up" && styles.row_over_up,
        isOver && direction === "down" && styles.row_over_down // styles.row_over
      )}
      ref={ref}
    >
      <div className={styles.drag_icon}>
        <DragIcon />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch(ingredientDelete({ idx: index, ingredient }))
        }
      />
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  ingredient: igredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
};
