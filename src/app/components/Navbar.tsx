import React from 'react';

import styles from "../css/Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <h1>Nav Bar</h1>
            <ul className={styles.list}>
                <li>Link1</li>
                <li>Link2</li>
                <li>Link3</li>
            </ul>
        </nav>
    );
};

export default Navbar;
