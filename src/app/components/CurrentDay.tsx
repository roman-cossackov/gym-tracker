import styles from '../css/CurrentDay.module.css'

const CurrentDay = () => {
    return (
        <>
            <h3 className={styles.date}>November 7 2023, tuesday</h3>
            <ul className={styles.list}>
                <li>
                    <input id="item1" type="checkbox" />
                    <label htmlFor="item1">Потренироваться</label>
                </li>
                <li>
                    <input id="item2" type="checkbox" />
                    <label htmlFor="item2">Поcпать 7 часов</label>
                </li>
                <li>
                    <input id="item3" type="checkbox" />
                    <label htmlFor="item3">Соблюсти режим питания</label>
                </li>
                <li>
                    <input id="item4" type="checkbox" />
                    <label htmlFor="item4">Сходить на массаж</label>
                </li>
            </ul>
            <button className={styles.change}>Change Routine</button>
        </>
    );
};

export default CurrentDay;
