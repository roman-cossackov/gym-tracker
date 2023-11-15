import { useContext, createContext, ReactNode } from "react";
import { db, auth } from "../../../firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import type { DocumentSnapshot, DocumentData } from "firebase/firestore";
import type { UseQueryResult } from "@tanstack/react-query";

type DatabaseContextProviderProps = {
    children: ReactNode;
};

type DatabaseContext = {
    user_info: UseQueryResult<object[], Error>;
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

    const routineQuery = useFirestoreQuery(["user_123412124", "user_tools", "routine"]);

    const contextValue: DatabaseContext = {
        routineQuery,
    };

    console.log(routineQuery.data)

    return (
        <DatabaseContext.Provider value={contextValue}>
            {children}
        </DatabaseContext.Provider>
    );
};
