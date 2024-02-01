import { ReactNode, useState } from "react";

import styles from "./Accordion.module.css";
import Button from "../Button/Button";
import IconButton, { IconButtonTheme } from "../IconButton/IconButton";

type Props = {
  title: string;
  isDropdownOpenInitialValue: boolean;
  children: ReactNode;
  hasButton?: boolean;
};

const Accordion = ({ title, isDropdownOpenInitialValue, children, hasButton }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    isDropdownOpenInitialValue
  );

  return (
    <>
      <div
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
      >
        {title}
      </div>
      {hasButton && <IconButton theme={IconButtonTheme.COG}/>}
      <div
        className={styles.dropdown}
        style={{
          gridTemplateRows: `${isDropdownOpen ? "1fr" : "0fr"}`,
        }}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default Accordion;
