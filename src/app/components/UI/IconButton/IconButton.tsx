import { faPencilAlt, faTrash, faCog } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import styles from "./IconButton.module.css";

interface IconButtonProps {
  buttonFunction: () => void;
  icon: "pencil" | "trash" | "cog";
};

const iconStyles = {
  pencil: faPencilAlt,
  trash: faTrash,
  cog: faCog,
};

function IconButton({ buttonFunction, icon }: IconButtonProps) {
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
