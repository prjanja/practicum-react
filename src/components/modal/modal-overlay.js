import PropTypes from "prop-types";
import styles from "./modal.module.css";

export const ModalOverlay = ({ onClick }) => {

  return <div className={styles.overlay} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};
