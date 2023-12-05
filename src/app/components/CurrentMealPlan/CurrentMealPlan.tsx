import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/fontawesome-free-solid";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import { useDatabase } from "../../context/FirestoreContext";
import styles from "./CurrentMealPlan.module.css";

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
                    (item: { id: number; body: string }) => (
                        <li key={item.id}>
                            <input type="checkbox" />
                            {item.body}

                            <FontAwesomeIcon
                                icon={faPencilAlt as IconProp}
                                className={styles.pencilIcon}
                                onClick={() => {
                                    setShowUpdateDialog(true);
                                    setNewUpdateItem(item.body);
                                    setNewUpdateItemId(item.id);
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash as IconProp}
                                className={styles.trashIcon}
                                onClick={() => {
                                    deleteDoc(
                                        mealPlanQuery?.data?.["Список рутины"],
                                        item.id,
                                        ['']
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
