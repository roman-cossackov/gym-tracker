import type { Dispatch, SetStateAction } from "react";

import styles from "./ListItem.module.css";
import IconButton from "../IconButton/IconButton";

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
      <IconButton
        icon="pencil"
        buttonFunction={() => {
          setShowUpdateDialog(true);
          setUpdateItem(item.title);
          setUpdateItemId(item.id);
        }}
      />
      <IconButton
        icon="trash"
        buttonFunction={() => {
            deleteItem();
          }}
      />
    </li>
  );
};

export default ListItem;
