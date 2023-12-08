"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import styles from "./Profile.module.css";
import { auth } from "../../../../firebase/firebase";
import { storage } from "../../../../firebase/firebase";
import { useDatabase } from "@/app/context/FirestoreContext";
import UploadAvatar from "../UploadAvatar/UploadAvatar";

const Profile = () => {
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const { userInfoQuery } = useDatabase();

    const uploadAvatar = async (avatar: Blob) => {
        const avatarRef = ref(storage, `avatars/${auth?.currentUser?.uid}`);
        await uploadBytes(avatarRef, avatar);
    };

    const getAvatarUrl = async () => {
        const avatarRef = ref(storage, `avatars/${auth?.currentUser?.uid}`);
        const img = await getDownloadURL(avatarRef);
        setAvatarUrl(img);
    };

    const name = userInfoQuery.isPending
        ? "...Loading"
        : userInfoQuery?.data?.["user_info"]["name"];

    const about = userInfoQuery.isPending
        ? "...Loading"
        : userInfoQuery?.data?.["user_info"]["about"];

    const achivements = userInfoQuery?.data?.["user_info"]["achivements"];

    useEffect(() => {
        getAvatarUrl();
    }, []);

    return (
        <section className={styles.profile}>
            <div className={styles.avatar}>
                {avatarUrl ? (
                    <Image
                        src={avatarUrl as string | StaticImport}
                        alt={"avatar"}
                        width={250}
                        height={250}
                    />
                ) : (
                    <p>Profile Photo</p>
                )}
            </div>
            <div>
                <h3>Upload Avatar</h3>
                <UploadAvatar onSave={uploadAvatar} />
            </div>
            <div className={styles.name}>
                <h2>{name}</h2>
            </div>
            <div className={styles.info}>{about}</div>
            <hr />
            <div className={styles.achivements}>
                <h3>Achivements</h3>
                <ul>
                    {userInfoQuery.isPending
                        ? "...Loading"
                        : achivements.map(
                              (item: { id: number; body: string }) => (
                                  <li key={item.id}>{item.body}</li>
                              )
                          )}
                </ul>
            </div>
            <button
                onClick={() => {
                    auth.signOut();
                }}
            >
                sign out
            </button>
        </section>
    );
};

export default Profile;
