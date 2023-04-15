import { useLocation, useNavigate } from "react-router-dom";
import { OrderList } from "../components/order-list";
import { useAppSelector, useSocket } from "../hooks";
import { selectFeedOrderList } from "../services/selectors";
import { getCookie } from "../utils/cookie";
import { userFeedAPI } from "../utils/endpoints";

export const OrdersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orders = useAppSelector(selectFeedOrderList);
  const handleOrderClick = (id: number) => () => {
    navigate(`${id}`, {
      state: { background: location },
    });
  };

  useSocket(
    userFeedAPI + `?token=${getCookie("accessToken")?.split(" ")?.[1]}`
  );

  return (
    <div>
      <OrderList orders={orders} onClick={handleOrderClick} showStatus />
    </div>
  );
};
