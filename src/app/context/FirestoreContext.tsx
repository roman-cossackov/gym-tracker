import { useContext, createContext, ReactNode } from "react";
import { db, auth } from "../../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import type { DocumentData } from "firebase/firestore";
import type { UseQueryResult } from "@tanstack/react-query";

type DatabaseContextProviderProps = {
    children: ReactNode;
};

type DatabaseContext = {
    userInfoQuery: UseQueryResult<DocumentData | null, Error>;
    routineQuery: UseQueryResult<DocumentData | null, Error>;
    mealPlanQuery: UseQueryResult<DocumentData | null, Error>;
    trainingPlanQuery: UseQueryResult<DocumentData | null, Error>;
    addDocToDb: (
        prevItems: DatabaseItem[],
        newItem: DatabaseItem,
        path: string[]
    ) => Promise<void>;
    updateDoc: (
        prevItems: DatabaseItem[],
        id: number,
        newBody: string,
        path: string[]
    ) => Promise<void>;
    deleteDoc: (
        prevItems: DatabaseItem[],
        id: number,
        path: string[]
    ) => Promise<void>;
    addPlanToDb: (plan: object, path: string[]) => Promise<void>;
};

export type DatabaseItem = {
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
            console.error("Error while fetching document:", error);
            return null;
        }
    };

    const useFirestoreQuery = (key: string, path: string[]) => {
        return useQuery({
            queryKey: [key],
            queryFn: () => getDocFromDb(path),
        });
    };

    const userInfoQuery = useFirestoreQuery("userInfoData", [
        `user_${user?.uid}`,
    ]);

    const routineQuery = useFirestoreQuery("routineData", [
        `user_${user?.uid}`,
        "user_tools",
        "routine",
    ]);

    const trainingPlanQuery = useFirestoreQuery("trainingPlanData", [
        `user_${user?.uid}`,
        "user_tools",
        "training_plan"
    ]);

    const mealPlanQuery = useFirestoreQuery("mealPlanData", [
        `user_${user?.uid}`,
        "user_tools",
        "meal_plan",
    ]);

    const addDocToDb = async (
        prevItems: DatabaseItem[],
        newItem: DatabaseItem,
        path: string[]
    ) => {
        try {
            const docRef = doc(db, "users", `user_${user?.uid}`, ...path);
            await setDoc(docRef, { "Список рутины": [...prevItems, newItem] });
        } catch (error) {
            console.error("Error while adding document:", error);
        }
    };

    const updateDoc = async (
        prevItems: DatabaseItem[],
        id: number,
        newBody: string,
        path: string[]
    ) => {
        try {
            const index = prevItems.findIndex((item) => item.id === id);
            prevItems[index].body = newBody;

            const docRef = doc(db, "users", `user_${user?.uid}`, ...path);
            await setDoc(docRef, { "Список рутины": [...prevItems] });
        } catch (error) {
            console.error("Error while updating document:", error);
        }
    };

    const deleteDoc = async (
        prevItems: DatabaseItem[],
        id: number,
        path: string[],
    ) => {
        try {
            prevItems = prevItems.filter((item) => item.id !== id);
            const docRef = doc(db, "users", `user_${user?.uid}`, ...path);
            await setDoc(docRef, { "Список рутины": [...prevItems] });
        } catch (error) {
            console.error("Error while deleting document:", error);
        }
    };

    const addPlanToDb = async (plan: object, path: string[]) => {
        try {
            const docRef = doc(db, "users", `user_${user?.uid}`, ...path);
            await setDoc(docRef, { "Тренировочный план": plan });
        } catch (error) {
            console.error("Error while adding plan:", error);
        }
    };

    const contextValue: DatabaseContext = {
        userInfoQuery,
        routineQuery,
        mealPlanQuery,
        trainingPlanQuery,
        addDocToDb,
        updateDoc,
        deleteDoc,
        addPlanToDb,
    };

    return (
        <DatabaseContext.Provider value={contextValue}>
            {children}
        </DatabaseContext.Provider>
    );
};
