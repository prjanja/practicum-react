import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { loginAction } from "../services/actions";
import { useAppDispatch } from "../hooks";

export const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const originPath = location.state && location.state.originPath;
  const handleLogin = () => {
    dispatch(loginAction(form)).then(() => {
      navigate(originPath || "/", { replace: true });
    });
  };
  const handleChangeForm =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((old) => ({ ...old, [fieldName]: e.target.value }));
    };

  return (
    <div className={styles.page_centered_content}>
      <div className="text text_type_main-medium">Вход</div>
      <div className="mb-20">
        <EmailInput
          extraClass="mt-6 mb-6"
          value={form.email}
          onChange={handleChangeForm("email")}
        />
        <PasswordInput
          extraClass="mt-6 mb-6"
          value={form.password}
          onChange={handleChangeForm("password")}
        />
        <Button type="primary" htmlType="button" onClick={handleLogin}>
          Войти
        </Button>
      </div>
      <div className="mb-4 text text_type_main-default text_color_inactive">
        Вы - новый пользователь?{" "}
        <Link to={"/register"}>Зарегистрироваться</Link>
      </div>
      <div className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to={"/forgot-password"}>Восстановить пароль</Link>
      </div>
    </div>
  );
};
