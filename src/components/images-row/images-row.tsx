import classNames from "classnames";
import styles from "./images-row.module.css";

type OwnProps = {
  sources: Array<{ src?: string; alt?: string }>;
  maxSize?: number;
};

export const ImagesRow = ({ sources, maxSize = 6 }: OwnProps) => {
  return (
    <div className={styles.logo_container}>
      {sources.map((source, index) => {
        if (!source.src) {
          return null;
        }
        if (index < maxSize) {
          return (
            <div
              key={index}
              className={classNames(
                styles.logo,
                index === maxSize - 1 && styles.logo_last
              )}
            >
              <img alt={source.alt} src={source.src} />
              {index === maxSize - 1 && <div>{`+${sources.length - index}`}</div>}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
