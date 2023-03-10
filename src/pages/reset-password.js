import { useState } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { request } from "../utils/request";
import { passwordChangeAPI } from "../utils/endpoints";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePassword = () => {
    return request(passwordChangeAPI, {
      method: "POST",
      body: JSON.stringify({
        password,
        token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((e) => {
        console.log(e?.message || e);
      });
  };

  if (!location.state?.resetted) {
    return <Navigate to={"/forgot-password"} replace />;
  }

  return (
    <div className={styles.page_centered_content}>
      <div className="text text_type_main-medium">Восстановление пароля</div>
      <div className="mb-20">
        <PasswordInput
          extraClass="mt-6 mb-6"
          placeholder="Введите новый пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          extraClass="mt-6 mb-6"
          placeholder="Введите код из письма"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button type="primary" htmlType="button" onClick={handleChangePassword}>
          Сохранить
        </Button>
      </div>
      <div className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to={"/login"}>Войти</Link>
      </div>
    </div>
  );
};
