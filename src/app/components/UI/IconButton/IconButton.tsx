import { faPencilAlt, faTrash } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./IconButton.module.css";

type Props = {
  buttonFunction: () => void;
  icon: "pencil" | "trash";
};

const iconStyles = {
  pencil: faPencilAlt,
  trash: faTrash,
};

function IconButton({ buttonFunction, icon }: Props) {
  return (
    <button className={styles.btn} onClick={buttonFunction}>
      <FontAwesomeIcon
        icon={iconStyles[`${icon}`] as IconProp}
        className={styles.pencilIcon}
      />
    </button>
  );
}

export default IconButton;
