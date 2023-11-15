"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { User } from "firebase/auth";

import "./globals.css";
import { auth } from "../../firebase/firebase";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { DatabaseContextProvider } from "./context/FirestoreContext";
import { useDatabase } from "./context/FirestoreContext";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
};

const addUserToDatabase = async (user: User | null) => {
    try {
        const querySnapshot = await getDoc(
            doc(db, "Users", `user_${user?.uid}`)
        );
        if (!querySnapshot.data()) {
            try {
                await setDoc(doc(db, "users", `user_${user?.uid}`), {
                    user_info: {
                        name: "This is My Name",
                        achivements: "This is My Achivements",
                        about: "This is About Field",
                    },
                });
            } catch (erorr) {
                console.log(erorr);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
            addUserToDatabase(user);
            setLoading(false);
        });
        return () => unregisterAuthObserver();
    }, []);

    const content = !isSignedIn ? (
        <html lang="en">
            <body className={inter.className}>
                {loading ? (
                    <Loader />
                ) : (
                    <div className={styles.authentication}>
                        <h1>Gym Tracker</h1>
                        <p>Please sign-in:</p>
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={auth}
                        />
                    </div>
                )}
            </body>
        </html>
    ) : (
        <html lang="en">
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <DatabaseContextProvider>
                        <Navbar />
                        {children}
                    </DatabaseContextProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
    return content;
}
