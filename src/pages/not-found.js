import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

export const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="m-4">Такой страницы не существует</div>
      <Button htmlType="button" onClick={() => navigate("/")}>
        На главную
      </Button>
    </div>
  );
};
