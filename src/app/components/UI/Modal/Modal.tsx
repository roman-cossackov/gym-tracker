import { useState } from "react";

import styles from "./Modal.module.css";

type Props = {
    children: JSX.Element;
    isOpen: boolean;
    width: number,
    height: number,
};

const Modal = ({ children, isOpen, width, height }: Props) => {
    return (
        isOpen && (
            <div className={styles.overlay}>
                <div className={styles.modal} style={{width: width, height: height}}>
                    <div className={styles.modalContent}>{children}</div>
                </div>
            </div>
        )
    );
};

export default Modal;
