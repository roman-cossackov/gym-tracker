import { useEffect, useRef, useState } from "react";

import styles from "./CurrentDay.module.css";
import { useDatabase } from "../../context/FirestoreContext";
import ListItem from "../UI/ListItem/ListItem";
import Dialog from "../UI/Dialog/Dialog";
import Button from "../UI/Button/Button";
import RequeredListItem from "../UI/RequeredListItem/RequeredListItem";
import Modal from "../UI/Modal/Modal";
import DaysOfWeekPicker from "../UI/DaysOfWeekPicker/DaysOfWeekPicker";
import { block, microblock, day, exercise } from "../CurrentTrainingPlan/types";

const CurrentDay = () => {
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [showUpdateItemDialog, setShowUpdateItemDialog] = useState(false);
  const [updateItem, setUpdateItem] = useState("");
  const [updateItemId, setUpdateItemId] = useState(0);
  const [trainingPlanModal, setTrainingPlanModal] = useState(false);
  const [mealPlanModal, setMealPlanModal] = useState(false);
  const [sleepPlanModal, setSleepPlanModal] = useState(false);
  const [showChangeRepetitionsDialog, setShowChangeRepetitionsDialog] =
    useState(false);
  const [cursorPotision, setCursorPotision] = useState({ x: 0, y: 0 });
  const [changeRepetitionsDialogMode, setChangeRepetitionsDialogMode] =
    useState<"days" | "frequency">("days");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState(1);

  const {
    routineQuery,
    trainingPlanQuery,
    addItemToRoutineArray,
    updateItemInRoutineArray,
    deleteItemFromRoutineArray,
    userInfoQuery,
    addDocToDb,
  } = useDatabase();

  if (routineQuery.isPending) {
    return <>...Loading</>;
  }

  if (routineQuery.isError) {
    return <>Error!</>;
  }

  const planData = trainingPlanQuery.data?.["Тренировочный план"];
  let planContent;
  if (trainingPlanQuery.isPending) {
    planContent = <p>Loading...</p>;
  } else if (trainingPlanQuery.isError) {
    planContent = <p>Training plan query error</p>;
  } else {
    planContent = planData?.blocks
      .filter((block: block) => block.isCompleted !== true)[0]
      ?.microblocks.filter(
        (microblock: microblock) => microblock.isCompleted !== true
      )[0]
      ?.days.filter((day: day) => day.isCompleted !== true)[0]
      .exercises.map((exercise: exercise) => (
        <li key={exercise.id}>{exercise.title}</li>
      )) || <p>Сегодня чилим тренировок нет</p>;
  }
  let planTitle = trainingPlanQuery.isPending ? (
    <p>...Loading</p>
  ) : trainingPlanQuery.isError ? (
    <p>Training plan query error</p>
  ) : (
    planData.title
  );

  const updateItemDialogContent = (
    <>
      <h1>Update Item</h1>
        <input
          type="text"
          placeholder="item..."
          value={updateItem}
          onChange={(event) => {
            setUpdateItem(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            updateItemInRoutineArray(
              routineQuery.data?.["Список рутины"],
              updateItemId,
              updateItem,
              ["user_tools", "routine"]
            );
            setUpdateItem("");
            setShowUpdateItemDialog(false);
          }}
        >
          Save
        </button>
        <button
          onClick={(event) => {
            setShowUpdateItemDialog(false);
          }}
        >
          Cancel
        </button>
    </>
  );

  const addItemDialogContent = (
    <>
      <h1>Add New Item</h1>
      <form>
        <input
          type="text"
          value={newItem}
          onChange={(event) => {
            setNewItem(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            const prevItems = routineQuery.data?.["Список рутины"];
            addItemToRoutineArray(
              prevItems,
              { id: prevItems[prevItems.length - 1].id + 1, title: newItem },
              ["user_tools", "routine"]
            );
            setShowAddItemDialog(false);
          }}
        >
          Add
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            setShowAddItemDialog(false);
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );

  const trainingFrequencyData = userInfoQuery.isPending
    ? "...Loading"
    : userInfoQuery.isError
    ? "Error"
    : userInfoQuery?.data?.["training_frequency"];

  let RepetitionsOfTraining: string;

  switch (trainingFrequencyData["type"]) {
    case "days":
      RepetitionsOfTraining = `Repeat Training: on every ${trainingFrequencyData[
        "days"
      ].join(", ")}`;
      break;
    case "frequency":
      RepetitionsOfTraining = `Repeat Training: every ${trainingFrequencyData["frequency"]} days`;
      break;
    default:
      RepetitionsOfTraining = "Repetitions of training is not set";
  }

  const userDocument = userInfoQuery.isPending
    ? "Loading..."
    : userInfoQuery.isError
    ? "Error"
    : userInfoQuery?.data;

  const saveNewDaysFreaquencyHandler = () => {
    if (typeof userDocument !== "string") {
      let newUserDocument = userDocument;
      if (newUserDocument !== null) {
        newUserDocument["training_frequency"]["days"] = selectedDays;
        newUserDocument["training_frequency"]["type"] = "days";
        addDocToDb(newUserDocument, []);
        setShowChangeRepetitionsDialog(false);
      }
    }
  };

  const saveNewPeriodicityFreaquencyHandler = () => {
    if (typeof userDocument !== "string") {
      let newUserDocument = userDocument;
      if (newUserDocument !== null) {
        newUserDocument["training_frequency"]["frequency"] = selectedFrequency;
        newUserDocument["training_frequency"]["type"] = "frequency";
        newUserDocument["training_frequency"]["starting day"] =
          new Date().toJSON();
        addDocToDb(newUserDocument, []);
        setShowChangeRepetitionsDialog(false);
      }
    }
  };

  let changePeriodicityDialogContent;
  if (changeRepetitionsDialogMode === "days") {
    changePeriodicityDialogContent = (
      <>
        <DaysOfWeekPicker
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
        {selectedDays.length ? (
          <button onClick={saveNewDaysFreaquencyHandler}>Set Frequency</button>
        ) : null}
      </>
    );
  } else if (changeRepetitionsDialogMode === "frequency") {
    changePeriodicityDialogContent = (
      <>
        <div>
          <input
            type="number"
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(+e.target.value)}
          />
        </div>
        <button onClick={saveNewPeriodicityFreaquencyHandler}>
          Set Frequency
        </button>
      </>
    );
  }

  const today = new Date();

  let trainingListItem;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (trainingFrequencyData["type"] === "days") {
    if (trainingFrequencyData["days"].includes(daysOfWeek[today.getDay()])) {
      trainingListItem = planContent;
    } else {
      trainingListItem = <p>Сегодня тренировок нет чилим</p>;
    }
  } else if (trainingFrequencyData["type"] === "frequency") {
    const day1 = new Date("12/21/2023");
    const day2 = new Date();
    const diffTime = day2.getTime() - day1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    console.log(diffDays);
    console.log(trainingFrequencyData["frequency"]);
    if (diffDays % trainingFrequencyData["frequency"] === 0) {
      trainingListItem = planContent;
    } else {
      trainingListItem = <p>Сегодня тренировок нет чилим</p>;
    }
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.date}>{`${today}`}</h2>
      <ul className={styles.list}>
        <RequeredListItem
          title={"Потренироваться"}
          content={trainingListItem}
          onClick={() => setTrainingPlanModal(true)}
        />
        {/* <RequeredListItem
          title={"Соблюсти режим питания"}
          content={"здесь будет написано че надо схавать"}
          onClick={() => setMealPlanModal(true)}
        />
        <RequeredListItem
          title={"Поспать 7 часов"}
          content={"здесь будет написано сколько нужно поспать"}
          onClick={() => setSleepPlanModal(true)}
        /> */}
        <Modal
          isOpen={trainingPlanModal}
          overlayOnCLick={() => setTrainingPlanModal(false)}
          height={400}
          width={600}
        >
          <p>Current plan: {planTitle}</p>
          <p>{RepetitionsOfTraining}</p>
          <button
            onClick={(event) => {
              const xCursorPotision =
                event.clientX - (window.innerWidth - 600) / 2;
              const yCursorPosition =
                event.clientY - (window.innerHeight - 400) / 2;
              setCursorPotision({ x: xCursorPotision, y: yCursorPosition });
              setShowChangeRepetitionsDialog((prev) => !prev);
            }}
          >
            Change Freaquency
          </button>
          <Dialog
            showDialog={showChangeRepetitionsDialog}
            cursorPotision={cursorPotision}
          >
            <button onClick={() => setChangeRepetitionsDialogMode("frequency")}>
              Frequency
            </button>
            <button onClick={() => setChangeRepetitionsDialogMode("days")}>
              Weekly on
            </button>
            {changePeriodicityDialogContent}
          </Dialog>
        </Modal>
        {routineQuery.data?.["Список рутины"].map(
          (item: { id: number; title: string }) => (
            <ListItem
              key={item.id}
              item={item}
              deleteItem={() =>
                deleteItemFromRoutineArray(
                  routineQuery.data?.["Список рутины"],
                  item.id,
                  ["user_tools", "routine"]
                )
              }
              setShowUpdateDialog={setShowUpdateItemDialog}
              setUpdateItem={setUpdateItem}
              setUpdateItemId={setUpdateItemId}
            />
          )
        )}
      </ul>
      <Button
        title={"+ Добавить пункт"}
        style="add"
        onClick={() => {
          setShowAddItemDialog(true);
        }}
      />

      <Dialog showDialog={showUpdateItemDialog}>
        {updateItemDialogContent}
      </Dialog>
      <Dialog showDialog={showAddItemDialog}>{addItemDialogContent}</Dialog>
    </section>
  );
};

export default CurrentDay;
