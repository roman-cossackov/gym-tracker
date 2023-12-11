import Link from "next/link";

import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.header}>
                Nav Bar
            </Link>
            <ul className={styles.list}>
                <li>
                    <Link href="plans">Plans</Link>
                </li>
                <li>
                    <Link href="articles">Articles</Link>
                </li>
                <li>
                    <Link href="diet-constructor">Diet Constructor</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
