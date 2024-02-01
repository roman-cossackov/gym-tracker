import type { Dispatch, ReactNode, SetStateAction } from "react";

import styles from "./Dialog.module.css";

interface DialogProps {
  showDialog: boolean;
  children: ReactNode;
  cursorPotision?: { x: number; y: number };
}

const Dialog = ({ showDialog, cursorPotision, children }: DialogProps) => {
  const cursorDialogStyle = {
    position: "absolute" as const,
    top: `${cursorPotision?.y}px`,
    left: `${cursorPotision?.x}px`,
  } as const;

  return (
    <dialog
      className={`${styles.dialog}`}
      style={cursorDialogStyle}
      open={showDialog}
    >
      {children}
    </dialog>
  );
};

export default Dialog;
