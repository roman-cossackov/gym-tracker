import styles from "./page.module.css";
import Profile from "./components/Profile";
import Tools from "./components/Tools";

export default function Home() {
    return (
        <main className={styles.main}>
           <Profile />
            <Tools />
        </main>
    );
}
