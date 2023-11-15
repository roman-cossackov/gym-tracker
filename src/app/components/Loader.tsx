import Image from "next/image";

import loader from "../../../public/spinner.gif";
import styles from "../css/Loader.module.css";

const Loader = () => {
    return (
        <main className={styles.main}>
            <Image src={loader} alt="Loading..." priority={true} />
        </main>
    );
};

export default Loader;
