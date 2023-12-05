"use client";

import React from "react";
import { useState } from "react";

import styles from "./Tools.module.css";
import CurrentDay from "../CurrentDay/CurrentDay";
import CurrentTrainingPlan from "../CurrentTrainingPlan/CurrentTrainingPlan";
import CurrentMealPlan from "../CurrentMealPlan/CurrentMealPlan";
import Statistics from "../Statistic/Statistics";
import Charts from "../Charts/Charts";

const Tools = () => {
    const [content, setContent] = useState(<CurrentDay />);

    return (
        <section className={styles.tools}>
            <div className={styles.navigation}>
                <button onClick={() => setContent(<CurrentDay />)}>
                    Current Day
                </button>
                <button onClick={() => setContent(<CurrentTrainingPlan />)}>
                    Current Training Plan
                </button>
                <button onClick={() => setContent(<CurrentMealPlan />)}>
                    Current Meal Plan
                </button>
                <button onClick={() => setContent(<Statistics />)}>
                    Statictics
                </button>
                <button onClick={() => setContent(<Charts />)}>Charts</button>
            </div>
            <div className={styles.container}>{content}</div>
        </section>
    );
};

export default Tools;
