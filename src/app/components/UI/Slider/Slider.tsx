import type { ChangeEvent } from "react";

import { useState } from "react";

import styles from "./Slider.module.css";

type Props = {
    max: number;
    min: number;
    value: number;
    defaultValue: number;
    onChange: (event: ChangeEvent) => void;
};

const Slider = ({ max, min, value, defaultValue, onChange, width }: Props) => {
    return (
        <div className={styles.sliderContainer}>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                className={styles.slider}
                style={{ width: width, "--value": value}}
            />
        </div>
    );
};

export default Slider;
