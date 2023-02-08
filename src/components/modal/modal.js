import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import PropTypes from "prop-types";

import { ModalOverlay } from "./modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modals-root");

export const Modal = ({
  title,
  open = false,
  onClose = (f) => console.log("close"),
  children,
}) => {
  useEffect(() => {
    const keyboardListener = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keyup", keyboardListener);
    return () => {
      document.removeEventListener("keyup", keyboardListener);
    };
  }, [onClose]);

  if (!open) {
    return null;
  }
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
            <CloseIcon onClick={onClose} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
