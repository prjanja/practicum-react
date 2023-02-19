import PropTypes from "prop-types";
import classNames from "classnames";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";

export const OrderDetails = ({ order }) => {
  return (
    <div className={classNames(styles.order, "mb-15")}>
      <div className={classNames("text text_type_digits-large", "mb-8")}>
        {order.number}
      </div>
      <div className={classNames("text text_type_main-medium", "mb-15")}>
        идентификатор заказа
      </div>
      <div className={classNames(styles.icon, "mb-15")}>
        <CheckMarkIcon />
      </div>
      <div className={classNames("text text_type_main-default", "mb-2")}>
        Ваш заказ начали готовить
      </div>
      <div className={"text text_type_main-default text_color_inactive"}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.number,
  }),
};
