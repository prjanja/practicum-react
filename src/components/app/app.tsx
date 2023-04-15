import { useEffect } from "react";
import classNames from "classnames";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../app-header";
import styles from "./app.module.css";

import { getIngredientsAction } from "../../services/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFound404,
  OrdersPage,
  OrdersItemPage,
  ProfileLayoutPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  FeedPage,
  FeedItemPage,
} from "../../pages";
import { ProtectedRoute } from "../protected-route";
import {
  selectIsUserAuthorized,
  selectIsUserLoading,
} from "../../services/selectors/user";
import { Modal } from "../modal";
import { getUserAction } from "../../services/actions";

function App() {
  const dispatch = useAppDispatch();
  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);
  const isUserLoading = useAppSelector(selectIsUserLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsAction());
    dispatch(getUserAction());
  }, [dispatch]);

  if (isUserLoading) {
    return <div>Загрузка</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={classNames(styles.content, "pb-6")}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:id" element={<FeedItemPage />} />
          <Route element={<ProtectedRoute isAllowed={!isUserAuthorized} />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAllowed={isUserAuthorized}
                redirectPath="/login"
              />
            }
          >
            <Route path="profile" element={<ProfileLayoutPage />}>
              <Route index element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<OrdersItemPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="ingredients/:id"
              element={
                <Modal
                  onClose={() => {
                    navigate(-1);
                  }}
                  title={"Детали ингредиента"}
                >
                  <IngredientPage />
                </Modal>
              }
            />
            <Route
              path="feed/:id"
              element={
                <Modal
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <FeedItemPage />
                </Modal>
              }
            />
            <Route
              path="profile/orders/:id"
              element={
                <Modal
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrdersItemPage />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
