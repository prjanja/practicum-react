import { NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import classNames from "classnames";
import styles from "./app-header.module.css";

type MenuItemProps = {
  title: string;
  icon: React.ComponentType<TIconProps>;
  path: string;
};

const MenuItem = ({ title, icon, path }: MenuItemProps) => {
  const Icon = icon;

  return (
    <NavLink to={path} className={styles.header_item}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          <span
            className={classNames(
              "text text_type_main-default",
              isActive ? "text_color_primary" : "text_color_inactive"
            )}
          >
            {title}
          </span>
        </>
      )}
    </NavLink>
  );
};

export const AppHeader = () => {
  return (
    <header className={classNames(styles.header, "mb-4", "mt-4")}>
      <div className={styles.header_left}>
        <MenuItem title={"Конструктор"} icon={BurgerIcon} path={"/"} />
        <MenuItem title={"Лента заказов"} icon={ListIcon} path={"/orders"} />
      </div>
      <Logo />
      <div className={styles.header_right}>
        <MenuItem
          title={"Личный кабинет"}
          icon={ProfileIcon}
          path={"/profile"}
        />
      </div>
    </header>
  );
};
