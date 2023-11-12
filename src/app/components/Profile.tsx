"use client";

import styles from "../css/Profile.module.css";
import { auth } from "../../../firebase/firebase"

const Profile = () => {
    return (
        <section className={styles.profile}>
            <div className={styles.avatar}>
                <p>Profile Photo</p>
            </div>
            <div className={styles.info}>
                <ul>
                    <li>
                        <div>Lorem, ipsum.</div>
                        <div>Aut, atque!</div>
                        <div>Consequuntur, ipsa.</div>
                        <div>Sed, aliquam.</div>
                        <div>Odio, in!</div>
                    </li>
                </ul>
            </div>
            <hr />
            <div className={styles.info}>
                <ul>
                    <li>
                        <div>Lorem, ipsum.</div>
                        <div>Aut, atque!</div>
                        <div>Consequuntur, ipsa.</div>
                        <div>Sed, aliquam.</div>
                        <div>Odio, in!</div>
                    </li>
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
