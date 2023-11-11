import styles from "../css/Statistics.module.css";

type Props = {};

const Statistics = (props: Props) => {
    return (
        <>
            <h3 className={styles.header}>Statisic for current plan</h3>
            <h3 className={styles.header}>
                *Drop down menu with all time, all pla, year, month, week
                periods*
            </h3>
            <ul className={styles.list}>
                <li>
                    <p>Тренировок было сделано: 322</p>
                </li>
                <li>
                    <p>Тоннаж: 10т</p>
                </li>
                <li>
                    <p>Количество подъемов штанги: 10023</p>
                </li>
            </ul>
        </>
    );
};

export default Statistics;
