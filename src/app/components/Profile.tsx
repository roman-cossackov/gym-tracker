import React from 'react';
import styles from '../css/Profile.module.css';

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
        </section>
    );
};

export default Profile;
