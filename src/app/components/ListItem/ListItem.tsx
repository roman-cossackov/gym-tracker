import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/fontawesome-free-solid";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { Dispatch, SetStateAction } from "react";

import styles from "./ListItem.module.css";

type Props = {
    item: { id: number; body: string };
    deleteDoc: () => Promise<void>;
    setShowUpdateDialog: Dispatch<SetStateAction<boolean>>;
    setUpdateItem: Dispatch<SetStateAction<string>>;
    setUpdateItemId: Dispatch<SetStateAction<number>>;
};

const ListItem = ({
    item,
    deleteDoc,
    setShowUpdateDialog,
    setUpdateItem,
    setUpdateItemId,
}: Props) => {
    return (
        <li key={item.id}>
            <input type="checkbox" id={`item${item.id}`} />
            <label htmlFor={`item${item.id}`}>{item.body}</label>
            <FontAwesomeIcon
                icon={faPencilAlt as IconProp}
                className={styles.pencilIcon}
                onClick={() => {
                    setShowUpdateDialog(true);
                    setUpdateItem(item.body);
                    setUpdateItemId(item.id);
                }}
            />
            <FontAwesomeIcon
                icon={faTrash as IconProp}
                className={styles.trashIcon}
                onClick={() => {
                    deleteDoc();
                }}
            />
        </li>
    );
};

export default ListItem;
