import { useParams } from "react-router-dom";
import { OrderHistoryDetails } from "../../components/order-history-details";
import { useAppSelector } from "../../hooks";
import { selectFeedOrderList } from "../../services/selectors";

export const OrdersItemPage = () => {
  const { id } = useParams();
  const order = useAppSelector(selectFeedOrderList).find(
    (order) => order.number === Number(id)
  );

  if (!order) {
    return null;
  }

  return (
    <div>
      <OrderHistoryDetails order={order} />
    </div>
  );
};
