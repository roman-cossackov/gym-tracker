import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/fontawesome-free-solid";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./CurrentMealPlan.module.css";
import { useDatabase } from "../../context/FirestoreContext";
import IconButton from "../UI/IconButton/IconButton";

type Props = {};

const CurrentMealPlan = (props: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [newUpdateItem, setNewUpdateItem] = useState("");
  const [newUpdateItemId, setNewUpdateItemId] = useState(0);

  const { mealPlanQuery, deleteDoc } = useDatabase();

  if (mealPlanQuery.isPending) {
    return <>Loading...</>;
  }

  if (mealPlanQuery.isError) {
    return <>Error!</>;
  }

  return (
    <>
      <h3 className={styles.date}>November 7 2023, tuesday</h3>
      <ul className={styles.list}>
        {mealPlanQuery?.data?.["Ежедневная норма"].map(
          (mealItem: { id: number; body: string }) => (
            <li key={mealItem.id}>
              <input type="checkbox" />
              {mealItem.body}
              <IconButton
                icon="pencil"
                buttonFunction={() => {
                  setShowUpdateDialog(true);
                  setNewUpdateItem(mealItem.body);
                  setNewUpdateItemId(mealItem.id);
                }}
              />
              <IconButton
                icon="pencil"
                buttonFunction={() => {
                  deleteDoc(
                    mealPlanQuery?.data?.["Список рутины"],
                    mealItem.id,
                    [""]
                  );
                }}
              />
            </li>
          )
        )}
      </ul>
      <button
        className={styles.addNewButton}
        onClick={() => {
          setShowDialog(true);
        }}
      >
        + Добавить пункт
      </button>
    </>
  );
};

export default CurrentMealPlan;
