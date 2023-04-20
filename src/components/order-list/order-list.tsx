import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { StatusTypes, StatusTypesLabel } from "../../utils/status-types";
import { OrderInfo } from "../../utils/types";
import { ImagesRow } from "../images-row";
import styles from "./order-list.module.css";

type OwnProps = {
  orders: Array<OrderInfo>;
  showStatus?: boolean;
  onClick: (id: number) => () => void;
};

export const OrderList = ({ orders, showStatus, onClick }: OwnProps) => {
  return (
    <div>
      {orders.map((order) => (
        <div
          className={classNames(styles.order_item, "mb-4 p-6")}
          key={order._id}
          onClick={onClick(order.number)}
        >
          <div className={classNames(styles.order_item_row, "mb-6")}>
            <span className="text text_type_digits-default">{`#${order.number}`}</span>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(order.createdAt)}
            />
          </div>
          <div
            className={classNames(
              showStatus ? "mb-2" : "mb-6",
              "text text_type_main-medium"
            )}
          >
            {order.name}
          </div>
          {showStatus && (
            <div
              className={classNames(
                "mb-6",
                "text text_type_main-default",
                order.status === StatusTypes.DONE && "text_color_success",
                order.status === StatusTypes.CANCELED && "text_color_error"
              )}
            >
              {StatusTypesLabel[order.status]}
            </div>
          )}
          <div className={styles.order_item_row}>
            <ImagesRow
              sources={order.ingredients.map((ingredient) => {
                return {
                  src: ingredient.image_mobile,
                  alt: ingredient.name,
                };
              })}
            />
            <div
              className={classNames(
                "text text_type_digits-default",
                styles.order_item_row_total
              )}
            >
              <CurrencyIcon type="primary" />
              {order.total}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
