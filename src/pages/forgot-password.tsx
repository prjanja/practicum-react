import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { request } from "../utils/request";
import { passwordResetAPI } from "../utils/endpoints";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRestore = () => {
    return request(passwordResetAPI, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/reset-password", {
          state: { resetted: true },
          replace: true,
        });
      })
      .catch((e: Error) => {
        console.log(e?.message || e);
      });
  };

  return (
    <div className={styles.page_centered_content}>
      <div className="text text_type_main-medium">Восстановление пароля</div>
      <div className="mb-20">
        <EmailInput
          extraClass="mt-6 mb-6"
          placeholder="Укажите e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="primary" htmlType="button" onClick={handleRestore}>
          Восстановить
        </Button>
      </div>
      <div className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to={"/login"}>Войти</Link>
      </div>
    </div>
  );
};
