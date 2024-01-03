import { ReactNode, useState } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  width: number;
  height: number;
  overlayOnCLick?: () => void;
}

const Modal = ({
  children,
  isOpen,
  width,
  height,
  overlayOnCLick,
}: ModalProps) => {
  return (
    isOpen && (
      <div className={styles.overlay} onClick={overlayOnCLick}>
        <div
          className={styles.modal}
          style={{ width: width, height: height }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
