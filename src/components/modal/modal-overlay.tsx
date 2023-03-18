import styles from "./modal.module.css";

type OwnProps = {
  onClick: () => void;
};

export const ModalOverlay = ({ onClick }: OwnProps) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};
