import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { ModalOverlay } from "./modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modals-root");

type OwnProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({
  title,
  onClose = () => console.log("close"),
  children,
}: OwnProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keyup", handleEscape);
    return () => {
      document.removeEventListener("keyup", handleEscape);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClick={onClose} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span
            className={classNames(styles.title, "text text_type_main-large")}
          >
            {title}
          </span>
          <div className={styles.close_icon}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    modalRoot!
  );
};
