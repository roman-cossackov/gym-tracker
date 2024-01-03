import { ReactNode, useState } from "react";

import styles from "./Accordion.module.css";

type Props = {
    title: string,
    isDropdownOpenInitialValue: boolean,
    children: ReactNode,
};

const Accordion = ({ title, isDropdownOpenInitialValue, children }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(isDropdownOpenInitialValue);

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
