import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { useAppDispatch } from "../hooks";
import { registerAction } from "../services/actions";

export const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeForm =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((old) => ({ ...old, [fieldName]: e.target.value }));
    };

  const handleRegister = () => {
    dispatch(registerAction(form)).then(() => navigate("/", { replace: true }));
  };

  return (
    <div className={styles.page_centered_content}>
      <div className="text text_type_main-medium">Регистрация</div>
      <div className="mb-20">
        <Input
          extraClass="mt-6 mb-6"
          placeholder="Имя"
          value={form.name}
          onChange={handleChangeForm("name")}
        />
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
        <Button type="primary" htmlType="button" onClick={handleRegister}>
          Зарегистрироваться
        </Button>
      </div>
      <div className="text text_type_main-default text_color_inactive">
        Уже зарегистрированны? <Link to={"/login"}>Войти</Link>
      </div>
    </div>
  );
};
