import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import styles from "./ListItem.module.css";
import IconButton, { IconButtonTheme } from "../IconButton/IconButton";
import Dialog from "../Dialog/Dialog";

interface Props {
  item: { id: number; title: string };
  deleteItem: () => Promise<void> | void;
  setShowListItemDialog: Dispatch<SetStateAction<boolean>>;
  setUpdateItem: Dispatch<SetStateAction<string>>;
  setUpdateItemId: Dispatch<SetStateAction<number>>;
  setDialogPotision: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

const ListItem = ({
  item,
  deleteItem,
  setShowListItemDialog,
  setUpdateItem,
  setUpdateItemId,
  setDialogPotision,
}: Props) => {
  const [showButtons, setShowButtons] = useState(false);
  return (
    <li className={styles.listItem}
      onMouseOver={() => {
        setShowButtons(true);
      }}
      onMouseOut={() => {
        setShowButtons(false);
      }}
    >
      <input type="checkbox" id={`item${item.id}`} />
      <label
        htmlFor={`item${item.id}`}
        className={styles.title}
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        {item.title}
      </label>
      {showButtons && (
        <div className={styles.buttons}>
          <IconButton
            theme={IconButtonTheme.PENCIL}
            buttonFunction={(event: React.MouseEvent<HTMLButtonElement>) => {
              setShowListItemDialog((prev) => !prev);
              setUpdateItem(item.title);
              setUpdateItemId(item.id);
              setDialogPotision({ x: event.clientX, y: event.clientY });
            }}
          />
          <IconButton
            theme={IconButtonTheme.TRASH}
            buttonFunction={() => {
              deleteItem();
            }}
          />
        </div>
      )}
    </li>
  );
};

export default ListItem;
