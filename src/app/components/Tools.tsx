import React from 'react';

import styles from '../css/Tools.module.css';
import CurrentDay from './CurrentDay';

const Tools = () => {
    return (
        <section className={styles.tools}>
            <div className={styles.navigation}>
                <button>Current Day</button>
                <button>Current Training Plan</button>
                <button>Current Meal Plan</button>
                <button>Statictics</button>
                <button>Charts</button>
            </div>
        <CurrentDay />
        </section>
    );
};

export default Tools;
