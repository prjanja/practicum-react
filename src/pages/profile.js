import { useEffect, useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUser } from "../services/selectors/user";
import { updateUserAction } from "../services/actions";

export const ProfilePage = () => {
  const defaultFormData = useAppSelector(selectUser);
  const [form, setForm] = useState(defaultFormData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setForm(defaultFormData);
  }, [defaultFormData]);

  const handleChangeForm = (fieldName) => (e) => {
    setForm((old) => ({
      ...old,
      [fieldName]: e.target.value,
      dirtyFlag: true,
    }));
  };

  const handleSaveForm = () => {
    dispatch(updateUserAction(form));
  };

  return (
    <div>
      <div className="mb-20">
        <Input
          extraClass="mb-6"
          placeholder="Имя"
          value={form.email}
          onChange={handleChangeForm("email")}
        />
        <Input
          extraClass="mt-6 mb-6"
          placeholder="Логин"
          value={form.name}
          onChange={handleChangeForm("name")}
        />
        <Input
          extraClass="mt-6 mb-6"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChangeForm("password")}
        />
      </div>
      {form.dirtyFlag && (
        <div className={styles.button_container}>
          <Button htmlType="button" onClick={handleSaveForm}>
            Сохранить
          </Button>
          <Button htmlType="button" onClick={() => setForm(defaultFormData)}>
            Отменить
          </Button>
        </div>
      )}
    </div>
  );
};
