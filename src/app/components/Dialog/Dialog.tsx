import type { Dispatch, SetStateAction } from "react";

import styles from "./Dialog.module.css";

type Props = {
    title: string;
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    item: string;
    setItem: Dispatch<SetStateAction<string>>;
    dialogFunction: () => void;
};

const Dialog = ({
    title,
    showDialog,
    setShowDialog,
    item,
    setItem,
    dialogFunction,
}: Props) => {
    return (
        <dialog className={styles.dialog} open={showDialog}>
            <div>{title}</div>
            <form>
                <input
                    type="text"
                    placeholder="item..."
                    value={item}
                    onChange={(event) => {
                        setItem(event.target.value);
                    }}
                />
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        dialogFunction();
                        setItem("");
                        setShowDialog(false);
                    }}
                >
                    Save
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        setShowDialog(false);
                    }}
                >
                    Cancel
                </button>
            </form>
        </dialog>
    );
};

export default Dialog;
