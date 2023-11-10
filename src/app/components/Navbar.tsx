import styles from '../css/Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <h1 className={styles.header}>Nav Bar</h1>
            <ul className={styles.list}>
                <li>
                    <Link href="plans">Plans</Link>
                </li>
                <li>
                    <Link href="/">Link2</Link>
                </li>
                <li>
                    <Link href="/">Link3</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
