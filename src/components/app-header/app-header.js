import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./app-header.module.css";

export const AppHeader = () => {
  return (
    <header className={classNames(styles.header, "mb-4", "mt-4")}>
      <div className={styles.header_left}>
        <div className={styles.header_item}>
          <BurgerIcon />
          <span>Конструктор</span>
        </div>
        <div className={classNames(styles.header_item, "text_color_inactive")}>
          <ListIcon type="secondary" />
          <span>Лента заказов</span>
        </div>
      </div>
      <Logo />
      <div className={styles.header_right}>
        <div className={styles.header_item}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </span>
        </div>
      </div>
    </header>
  );
};
