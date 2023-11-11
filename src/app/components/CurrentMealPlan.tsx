import styles from "../css/CurrentMealPlan.module.css";

type Props = {};

const CurrentMealPlan = (props: Props) => {
    return (
        <>
            <h3 className={styles.date}>November 7 2023, tuesday</h3>
            <ul className={styles.list}>
                <li>
                    <input type="checkbox" id="item1" />
                    <label htmlFor="item1">3 яйца</label>
                </li>
                <li>
                    <input type="checkbox" id="item1" />
                    <label htmlFor="item1">100 грамм кукурузых хлопьев</label>
                </li>
                <li>
                    <input type="checkbox" id="item1" />
                    <label htmlFor="item1">200 грамм куринного фарша</label>
                </li>
                <li>
                    <input type="checkbox" id="item1" />
                    <label htmlFor="item1">200 грамм риса</label>
                </li>
                <button className={styles.change}>Change Routine</button>
            </ul>
        </>
    );
};

export default CurrentMealPlan;
