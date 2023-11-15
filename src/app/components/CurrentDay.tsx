import { useEffect, useState } from "react";
import { useDatabase } from "../context/FirestoreContext";
import { useQuery } from "@tanstack/react-query";

import styles from "../css/CurrentDay.module.css";

const CurrentDay = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [docs, setDocs] = useState<object[]>([]);

    const { routineQuery } = useDatabase();

    if (routineQuery.isPending) {
        return <>...Loading</>;
    }

    if (routineQuery.isError) {
        return <>Error!</>;
    }

    return (
        <>
            <h2 className={styles.date}>November 16, 2023</h2>
            <ul className={styles.list}>
                {routineQuery.data["Список рутины"].map((item) => (
                    <li key={item.id}>
                        <input type="checkbox" id={`routine-item${item.id}`}/>
                        <label htmlFor={`routine-item${item.id}`}>{item.body}</label>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CurrentDay;
