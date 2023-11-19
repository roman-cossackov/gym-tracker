import styles from "./CurrentTrainingPlan.module.css";

type Props = {};

const CurrentTrainingPlan = (props: Props) => {
    return (
        <>
            <h3 className={styles.date}>November 7 2023, tuesday</h3>
            <ul className={styles.list}>
                <li>
                    <input type="checkbox" id="item1" />
                    <label htmlFor="item1">Атжуманя 10 раз</label>
                </li>
                <li>
                    <input type="checkbox" id="item1" />
                    <label htmlFor="item1">Бегат 20 минут</label>
                </li>
                <li>
                    <input type="checkbox" id="item1" />
                    <label htmlFor="item1">Прэс качат 3 по 15</label>
                </li>
                <button className={styles.change}>Change Routine</button>
            </ul>
        </>
    );
};

export default CurrentTrainingPlan;
