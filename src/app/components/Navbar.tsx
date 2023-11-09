import React from 'react';

import styles from "../css/Navbar.module.css"
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <h1 className={styles.header}>Nav Bar</h1>
            <ul className={styles.list}>
                <Link href="/">Link1</Link>
                <Link href="/">Link2</Link>
                <Link href="/">Link3</Link>
            </ul>
        </nav>
    );
};

export default Navbar;
