import {
  NavLink,
  useNavigate,
  Outlet,
  useMatch,
} from "react-router-dom";
import classNames from "classnames";
import styles from "./profile.module.css";
import { useAppDispatch } from "../../hooks";
import { logoutAction } from "../../services/actions";

export const ProfileLayoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pathMatch = useMatch("/profile/orders");

  const handleLogout = () => {
    dispatch(logoutAction()).then(() => {
      navigate("/login");
    });
  };
  return (
    <div className={styles.profile_content}>
      <div className={styles.menu_container}>
        <div className={styles.menu}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              classNames(
                styles.menu_item,
                isActive ? "text_color_primary" : "text_color_inactive"
              )
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              classNames(
                styles.menu_item,
                isActive ? "text_color_primary" : "text_color_inactive"
              )
            }
          >
            История заказов
          </NavLink>
          <div
            className={classNames(styles.menu_item, "text_color_inactive")}
            onClick={handleLogout}
          >
            Выход
          </div>
        </div>
        <div className={"text text_type_main-default text_color_inactive"}>
          {`В этом разделе вы можете ${
            pathMatch
              ? "посмотреть историю заказов"
              : "изменить свои персональные данные"
          }`}
        </div>
      </div>
      <div
        className={classNames(
          styles.outlet_container,
          "custom-scrollbar",
          "pr-2"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};
