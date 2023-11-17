import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/fontawesome-free-solid";

import { useDatabase } from "../context/FirestoreContext";
import styles from "../css/CurrentDay.module.css";

const CurrentDay = () => {
    const [newItem, setNewItem] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [newUpdateItem, setNewUpdateItem] = useState("");
    const [newUpdateItemId, setNewUpdateItemId] = useState(0);

    const { routineQuery, addDocToDb, updateDoc, deleteDoc } = useDatabase();

    if (routineQuery.isPending) {
        return <>...Loading</>;
    }

    if (routineQuery.isError) {
        return <>Error!</>;
    }

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.date}>November 16, 2023</h2>
            <ul className={styles.list}>
                {routineQuery.data["Список рутины"].map((item) => (
                    <li key={item.id}>
                        <input type="checkbox" id={`routine-item${item.id}`} />
                        <label htmlFor={`routine-item${item.id}`}>
                            {item.body}
                        </label>
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            className={styles.pencilIcon}
                            onClick={() => {
                                setShowUpdateDialog(true);
                                setNewUpdateItem(item.body);
                                setNewUpdateItemId(item.id);
                            }}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            className={styles.trashIcon}
                            onClick={() => {
                                deleteDoc(
                                    routineQuery.data["Список рутины"],
                                    item.id
                                );
                            }}
                        />
                    </li>
                ))}
            </ul>
            <button
                className={styles.addNewButton}
                onClick={() => {
                    setShowDialog(true);
                }}
            >
                + Добавить пункт
            </button>
            <dialog className={styles.addItemDialog} open={showDialog}>
                <div>Add Item Dialog</div>
                <form>
                    <input
                        type="text"
                        placeholder="item..."
                        value={newItem}
                        onChange={(event) => {
                            setNewItem(event.target.value);
                        }}
                    />
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            addDocToDb(routineQuery.data["Список рутины"], {
                                body: newItem,
                                id:
                                    routineQuery.data["Список рутины"][
                                        routineQuery.data["Список рутины"]
                                            .length - 1
                                    ].id + 1,
                            });
                            setNewItem("");
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
            <dialog className={styles.updateItemDialog} open={showUpdateDialog}>
                <div>Update Item Dialog</div>
                <form>
                    <input
                        type="text"
                        placeholder="item..."
                        value={newUpdateItem}
                        onChange={(event) => {
                            setNewUpdateItem(event.target.value);
                        }}
                    />
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            updateDoc(
                                routineQuery.data["Список рутины"],
                                newUpdateItemId,
                                newUpdateItem
                            );
                            setShowUpdateDialog(false);
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setShowUpdateDialog(false);
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </dialog>
        </section>
    );
};

export default CurrentDay;
