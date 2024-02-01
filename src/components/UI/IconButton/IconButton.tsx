import {
  faPencilAlt,
  faTrash,
  faCog,
} from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./IconButton.module.css";

export enum IconButtonTheme {
  PENCIL = "pencil",
  TRASH = "trash",
  COG = "cog"
}

interface IconButtonProps {
  buttonFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
  theme: IconButtonTheme;
}

const icons = {
  pencil: faPencilAlt,
  trash: faTrash,
  cog: faCog,
};

function IconButton({ buttonFunction, theme }: IconButtonProps) {
  return (
    <button className={styles.btn} onClick={buttonFunction}>
      <FontAwesomeIcon
        icon={icons[`${theme}`] as IconProp}
        className={styles.pencilIcon}
      />
    </button>
  );
}

export default IconButton;
