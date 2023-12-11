import { ReactNode, useState } from "react";

import styles from "./Accordion.module.css";

type Props = {
    title: string,
    children: ReactNode,
};

const Accordion = ({ title, children }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    return (
        <>
            <div
                onClick={() => {
                    setIsDropdownOpen((prev) => !prev);
                }}
            >
                {title}
            </div>
            <div
                className={styles.dropdown}
                style={{
                    gridTemplateRows: `${isDropdownOpen ? "1fr" : "0fr"}`,
                }}
            >
                <div className={styles.content}>{children}</div>
            </div>
        </>
    );
};

export default Accordion;
