"use client";

import React from "react";
import { useState } from "react";

import styles from "../css/Tools.module.css";
import CurrentDay from "./CurrentDay";
import CurrentTrainingPlan from "./CurrentTrainingPlan";
import CurrentMealPlan from "./CurrentMealPlan";
import Statistics from "./Statistics";
import Charts from "./Charts";

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
            {content}
        </section>
    );
};

export default Tools;
