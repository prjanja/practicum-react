import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from "../styles.module.css";
import { useAppSelector, useSocket } from "../../hooks";
import {
  selectFeedOrderList,
  selectFeedTotal,
  selectFeedTotalToday,
} from "../../services/selectors";
import { OrderList } from "../../components/order-list";
import { StatusTypes } from "../../utils/status-types";
import { allFeedAPI } from "../../utils/endpoints";

export const FeedPage = () => {
  const orders = useAppSelector(selectFeedOrderList);
  const total = useAppSelector(selectFeedTotal);
  const totalToday = useAppSelector(selectFeedTotalToday);
  const navigate = useNavigate();
  const location = useLocation();
  useSocket(allFeedAPI);

  const handleOrderClick = (id: number) => () => {
    navigate(`${id}`, {
      state: { background: location },
    });
  };

  return (
    <section className={styles.feed_wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <section>
        <div className={"mr-15 pr-2 custom-scrollbar"} style={{ flex: 1 }}>
          <OrderList orders={orders} onClick={handleOrderClick} />
        </div>
        <div>
          <div className={classNames("mb-15", styles.order_numbers_wrapper)}>
            <div>
              <div className="mb-6 text text_type_main-medium">Готовы</div>
              <div
                className={classNames(styles.order_numbers, "custom-scrollbar")}
              >
                {orders
                  .filter((order) => order.status === StatusTypes.DONE)
                  .map((order) => (
                    <div
                      className="text text_type_digits-default text_color_success"
                      key={order._id}
                    >
                      {order.number}
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className="mb-6 text text_type_main-medium">В работе</div>
              <div
                className={classNames(styles.order_numbers, "custom-scrollbar")}
              >
                {orders
                  .filter((order) => order.status === StatusTypes.IN_PROGRESS)
                  .map((order) => (
                    <div
                      className="text text_type_digits-default"
                      key={order._id}
                    >
                      {order.number}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mb-15">
            <div className="text text_type_main-medium">
              Выполнено за все время:
            </div>
            <div className="text text_type_digits-large">{total}</div>
          </div>
          <div>
            <div className="text text_type_main-medium">
              Выполнено за сегодня:
            </div>
            <div className="text text_type_digits-large">{totalToday}</div>
          </div>
        </div>
      </section>
    </section>
  );
};
