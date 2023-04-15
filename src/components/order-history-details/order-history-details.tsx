import classNames from "classnames";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-history-details.module.css";
import { OrderInfo } from "../../utils/types";
import { StatusTypes, StatusTypesLabel } from "../../utils/status-types";

type OwnProps = {
  order: OrderInfo;
};

export const OrderHistoryDetails = ({ order }: OwnProps) => {
  return (
    <div className={classNames(styles.order, "mb-15")}>
      <div
        className={classNames(
          "text text_type_digits-default mb-10",
          styles.order_number
        )}
      >{`#${order.number}`}</div>
      <div className="text text_type_main-medium mb-3">{order.name}</div>
      <div
        className={classNames(
          "text text_type_main-medium mb-15",
          order.status === StatusTypes.DONE && "text_color_success",
          order.status === StatusTypes.CANCELED && "text_color_error"
        )}
      >
        {StatusTypesLabel[order.status]}
      </div>
      <div className="text text_type_main-medium mb-6">Состав:</div>
      <div
        className={classNames(styles.ingredients, "mb-10", "custom-scrollbar")}
      >
        {order.ingredients.map((ingredient) => {
          return (
            <div
              key={ingredient?._id}
              className={classNames(styles.ingredient_row, "mb-4 pr-6")}
            >
              <div className="mr-4">
                <img
                  className={styles.icon}
                  src={ingredient?.image_mobile}
                  alt={ingredient?.name}
                />
              </div>
              <div className="mr-4 text text_type_main-default">
                {ingredient.name}
              </div>
              <div
                className={classNames(
                  styles.price,
                  "text text_type_digits-default"
                )}
              >
                <span>{`${ingredient?.count}\xa0X\xa0${ingredient?.price}`}</span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.total_row}>
        <FormattedDate
          className="text text_type_main-medium text_color_inactive"
          date={new Date(order.createdAt)}
        />
        <div
          className={classNames("text text_type_digits-default", styles.total)}
        >
          <CurrencyIcon type="primary" />
          {order.total}
        </div>
      </div>
    </div>
  );
};
