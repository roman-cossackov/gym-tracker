import { Dispatch, SetStateAction, useState } from "react";

import styles from "./DaysOfWeekPicker.module.css";

interface DaysOfWeekPickerProps {
  selectedDays: string[];
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
}

const DaysOfWeekPicker = (props: DaysOfWeekPickerProps) => {
  const {selectedDays, setSelectedDays} = props;

  const onSelectDayHandler = (day: string) => {
    if (!selectedDays.includes(day)) {
      setSelectedDays((prev) => [...prev, day]);
    } else {
      const newSelectedDays = selectedDays.filter((d) => d !== day);
      setSelectedDays(newSelectedDays);
    }
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <>
      <h2>Select Days of the Week</h2>
      <ul className={styles.days}>
        {days.map((day) => (
          <button
            key={day}
            className={`${styles.day} ${selectedDays.includes(day) ? styles.clicked : ''}`}
            onClick={() => onSelectDayHandler(day)}
          >
            {day}
          </button>
        ))}
      </ul>
    </>
  );
};

export default DaysOfWeekPicker;
