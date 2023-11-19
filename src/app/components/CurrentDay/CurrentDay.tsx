import { useState } from "react";

import { useDatabase } from "../../context/FirestoreContext";
import ListItem from "../ListItem/ListItem";
import Dialog from "../Dialog/Dialog";
import styles from "./CurrentDay.module.css";

const CurrentDay = () => {
    const [showAddItemDialog, setShowAddItemDialog] = useState(false);
    const [newItem, setNewItem] = useState("");
    const [showUpdateItemDialog, setShowUpdateItemDialog] = useState(false);
    const [updateItem, setUpdateItem] = useState("");
    const [updateItemId, setUpdateItemId] = useState(0);

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
                {routineQuery?.data?.["Список рутины"].map(
                    (item: { id: number; body: string }) => (
                        <ListItem
                            key={item.id}
                            item={item}
                            deleteDoc={() =>
                                deleteDoc(
                                    routineQuery?.data?.["Список рутины"],
                                    item.id
                                )
                            }
                            setShowUpdateDialog={setShowUpdateItemDialog}
                            setUpdateItem={setUpdateItem}
                            setUpdateItemId={setUpdateItemId}
                        />
                    )
                )}
            </ul>
            <button
                className={styles.addNewButton}
                onClick={() => {
                    setShowAddItemDialog(true);
                }}
            >
                + Добавить пункт
            </button>
            <Dialog
                title={"Add Item"}
                showDialog={showAddItemDialog}
                setShowDialog={setShowAddItemDialog}
                item={newItem}
                setItem={setNewItem}
                dialogFunction={() => {
                    const prevItems = routineQuery?.data?.["Список рутины"];
                    addDocToDb(
                        prevItems,
                        {
                            body: newItem,
                            id: prevItems.length
                                ? prevItems[prevItems.length - 1].id + 1
                                : 1,
                        },
                        ["user_tools", "routine"]
                    );
                }}
            />
            <Dialog
                title={"Update Item"}
                showDialog={showUpdateItemDialog}
                setShowDialog={setShowUpdateItemDialog}
                item={updateItem}
                setItem={setUpdateItem}
                dialogFunction={() => {
                    updateDoc(
                        routineQuery?.data?.["Список рутины"],
                        updateItemId,
                        updateItem,
                        ["user_tools", "routine"],
                    );
                }}
            />
        </section>
    );
};

export default CurrentDay;
