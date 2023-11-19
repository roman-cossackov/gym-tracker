import { useContext, createContext, ReactNode } from "react";
import { db, auth } from "../../../firebase/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import type { DocumentSnapshot, DocumentData } from "firebase/firestore";
import type { UseQueryResult } from "@tanstack/react-query";

type DatabaseContextProviderProps = {
    children: ReactNode;
};

type DatabaseContext = {
    routineQuery: UseQueryResult<DocumentData | null, Error>;
    addDocToDb: (
        prevItems: DatabaseItem[],
        newItem: DatabaseItem
    ) => Promise<void>;
    updateDoc: (
        prevItems: DatabaseItem[],
        id: number,
        newBody: string
    ) => Promise<void>;
    deleteDoc: (prevItems: DatabaseItem[], id: number) => Promise<void>;
};

type DatabaseItem = {
    id: number;
    body: string;
};

const DatabaseContext = createContext({} as DatabaseContext);

export const useDatabase = () => {
    return useContext(DatabaseContext);
};

export const DatabaseContextProvider = ({
    children,
}: DatabaseContextProviderProps) => {
    const user = auth.currentUser;

    const getDocFromDb = async (path: string[]) => {
        try {
            const docRef = doc(db, "users", ...path);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const documentData = docSnap.data();
                return documentData;
            } else {
                console.log("Document does not exist");
                return null;
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            return null;
        }
    };

    const useFirestoreQuery = (path: string[]) => {
        return useQuery({
            queryKey: ["firebaseData"],
            queryFn: () => getDocFromDb(path),
        });
    };

    const routineQuery = useFirestoreQuery([
        "user_123412124",
        "user_tools",
        "routine",
    ]);

    const addDocToDb = async (
        prevItems: DatabaseItem[],
        newItem: DatabaseItem
    ) => {
        const docRef = doc(
            db,
            "users",
            "user_123412124",
            "user_tools",
            "routine"
        );
        await setDoc(docRef, { "Список рутины": [...prevItems, newItem] });
    };

    const updateDoc = async (
        prevItems: DatabaseItem[],
        id: number,
        newBody: string
    ) => {
        const index = prevItems.findIndex((item) => item.id === id);
        prevItems[index].body = newBody;
        console.log(prevItems);

        const docRef = doc(
            db,
            "users",
            "user_123412124",
            "user_tools",
            "routine"
        );
        await setDoc(docRef, { "Список рутины": [...prevItems] });
    };

    const deleteDoc = async (prevItems: DatabaseItem[], id: number) => {
        prevItems = prevItems.filter((item) => item.id !== id);
        const docRef = doc(
            db,
            "users",
            "user_123412124",
            "user_tools",
            "routine"
        );
        await setDoc(docRef, { "Список рутины": [...prevItems] });
    };

    const contextValue: DatabaseContext = {
        routineQuery,
        addDocToDb,
        updateDoc,
        deleteDoc,
    };

    return (
        <DatabaseContext.Provider value={contextValue}>
            {children}
        </DatabaseContext.Provider>
    );
};
