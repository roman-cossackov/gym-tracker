import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/fontawesome-free-solid";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { Dispatch, SetStateAction } from "react";

import styles from "./ListItem.module.css";

type Props = {
    item: { id: number; title: string };
    deleteItem: () => Promise<void> | void;
    setShowUpdateDialog: Dispatch<SetStateAction<boolean>>;
    setUpdateItem: Dispatch<SetStateAction<string>>;
    setUpdateItemId: Dispatch<SetStateAction<number>>;
};

const ListItem = ({
    item,
    deleteItem,
    setShowUpdateDialog,
    setUpdateItem,
    setUpdateItemId,
}: Props) => {
    return (
        <li>
            <input type="checkbox" id={`item${item.id}`} />
            <label htmlFor={`item${item.id}`}>{item.title}</label>
            <FontAwesomeIcon
                icon={faPencilAlt as IconProp}
                className={styles.pencilIcon}
                onClick={() => {
                    setShowUpdateDialog(true);
                    setUpdateItem(item.title);
                    setUpdateItemId(item.id);
                }}
            />
            <FontAwesomeIcon
                icon={faTrash as IconProp}
                className={styles.trashIcon}
                onClick={() => {
                    deleteItem();
                }}
            />
        </li>
    );
};

export default ListItem;
