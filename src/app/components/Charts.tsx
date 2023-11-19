import styles from "../css/Charts.module.css";

type Props = {};

const Charts = (props: Props) => {
    return (
        <>
            <h3 className={styles.header}>This is Charts component</h3>
            <ul className={styles.list}>
                <li>
                    <p>Imagine this is a chart 1</p>
                </li>
                <li>
                    <p>Imagine this is a chart 2</p>
                </li>
                <li>
                    <p>Imagine this is a chart 3</p>
                </li>
                <li>
                    <p>Imagine this is a chart 4</p>
                </li>
                <li>
                    <p>Imagine this is a chart 5</p>
                </li>
            </ul>
        </>
    );
};

export default Charts;
