import { useState } from "react";

import styles from "./CreateNewPlan.module.css";
import { useDatabase } from "@/app/context/FirestoreContext";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import Accordion from "../../UI/Accordion/Accordion";
import ListItem from "../../UI/ListItem/ListItem";
import Dialog from "../../UI/Dialog/Dialog";

type Props = {};

const CreateNewPlan = (props: Props) => {
  const planTemplate = {
    title: "",
    blocks: [
      {
        id: 1,
        title: "",
        microblocks: [
          {
            id: 1,
            days: [
              {
                id: 1,
                exercises: [
                  {
                    id: 1,
                    title: "Упражнение 1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [newPlan, setNewPlan] = useState(planTemplate);
  const [showUpdateItemDialog, setShowUpdateItemDialog] = useState(false);
  const [updateItem, setUpdateItem] = useState("");
  const [updateItemId, setUpdateItemId] = useState(0);
  const [updateItemBlockId, setUpdateItemBlockId] = useState(0);
  const [updateItemMicroblockId, setUpdateItemMicroblockId] = useState(0);
  const [updateItemDayId, setUpdateItemDayId] = useState(0);

  const { addPlanToDb } = useDatabase();

  const updateExercise = () => {
    const updatedPlan = { ...newPlan };
    const block = updatedPlan.blocks.find(
      (block) => block.id === updateItemBlockId
    );
    const microblock = block?.microblocks.find(
      (microblock) => microblock.id === updateItemMicroblockId
    );
    const day = microblock?.days.find((day) => day.id === updateItemDayId);

    const exercise = day?.exercises.find(
      (exercise) => exercise.id === updateItemId
    );
    if (!exercise) {
      console.log("Item not Found");
    } else {
      exercise.title = updateItem;
    }
    setNewPlan(updatedPlan);
  };

  return (
    <>
      <Button
        title={"Create New Plan"}
        onClick={() => setIsOpen(true)}
        style={"blue"}
      />
      <Modal isOpen={isOpen} height={500} width={800}>
        <div className={styles.wrapper}>
          <h3 className={styles.header}>CreateNewPlan</h3>
          <div>
            <label htmlFor="plan-title">Название плана</label>
            <input
              type="text"
              id="plan-title"
              defaultValue={newPlan.title}
              onChange={(event) => {
                const updatedPlan = { ...newPlan };
                updatedPlan.title = event.target.value;
                setNewPlan(updatedPlan);
              }}
            />
          </div>
          <ul>
            {newPlan.blocks.map((block) => (
              <li key={block.id}>
                <Accordion title={block.title || "New Block"}>
                  <ul>
                    {block.microblocks.map((microblock) => (
                      <li key={microblock.id}>
                        <Accordion title={`Microblock ${microblock.id}`}>
                          <ul>
                            {microblock.days.map((day) => (
                              <li key={day.id}>
                                <Accordion title={`Day ${day.id}`}>
                                  <ul>
                                    {day.exercises.map((exercise) => (
                                      <ListItem
                                        key={exercise.id}
                                        item={exercise}
                                        deleteItem={() => {
                                          const id = exercise.id;
                                          const updatedPlan = {
                                            ...newPlan,
                                          };
                                          day.exercises = day.exercises.filter(
                                            (i) => i.id !== id
                                          );
                                          setNewPlan(updatedPlan);
                                        }}
                                        setShowUpdateDialog={(isOpen) => {
                                          setShowUpdateItemDialog(isOpen);
                                          setUpdateItemBlockId(block.id);
                                          setUpdateItemMicroblockId(
                                            microblock.id
                                          );
                                          setUpdateItemDayId(day.id);
                                          console.log(
                                            updateItemBlockId,
                                            updateItemMicroblockId,
                                            updateItemDayId
                                          );
                                        }}
                                        setUpdateItem={setUpdateItem}
                                        setUpdateItemId={setUpdateItemId}
                                      />
                                    ))}
                                  </ul>
                                  <Button
                                    title={"+exercise"}
                                    style={"add"}
                                    onClick={() => {
                                      const updatedPlan = { ...newPlan };
                                      const exercises = day.exercises;
                                      exercises.push({
                                        title: "New Exercise",
                                        id:
                                          exercises[exercises.length - 1].id +
                                          1,
                                      });
                                      setNewPlan(updatedPlan);
                                    }}
                                  />
                                </Accordion>
                              </li>
                            ))}
                          </ul>
                          <Button
                            title={"+day"}
                            style={"add"}
                            onClick={() => {
                              const updatedPlan = { ...newPlan };
                              const days = microblock.days;
                              days.push({
                                id: days[days.length - 1].id + 1,
                                exercises: [
                                  {
                                    id: 1,
                                    title: "Упражнение 1",
                                  },
                                ],
                              });
                              setNewPlan(updatedPlan);
                            }}
                          />
                        </Accordion>
                      </li>
                    ))}
                  </ul>
                  <Button
                    title={"+microblock"}
                    style={"add"}
                    onClick={() => {
                      const updatedPlan = { ...newPlan };
                      const microblocks = block.microblocks;
                      microblocks.push({
                        id: microblocks[microblocks.length - 1].id + 1,
                        days: [
                          {
                            id: 1,
                            exercises: [
                              {
                                id: 1,
                                title: "Упражнение 1",
                              },
                            ],
                          },
                        ],
                      });
                      setNewPlan(updatedPlan);
                    }}
                  />
                </Accordion>
              </li>
            ))}
          </ul>
          <Button
            title={"Create New Block"}
            onClick={() => {
              const updatedPlan = { ...newPlan };
              const blocks = updatedPlan.blocks;
              blocks.push({
                id: 1,
                title: "",
                microblocks: [
                  {
                    id: blocks[blocks.length - 1].id + 1,
                    days: [
                      {
                        id: 1,
                        exercises: [
                          {
                            id: 1,
                            title: "Упражнение 1",
                          },
                        ],
                      },
                    ],
                  },
                ],
              });
              setNewPlan(updatedPlan);
            }}
          />

          <Dialog
            title={"Update Item"}
            showDialog={showUpdateItemDialog}
            setShowDialog={setShowUpdateItemDialog}
            item={updateItem}
            setItem={setUpdateItem}
            dialogFunction={updateExercise}
          />
          <Button title={"Close"} onClick={() => setIsOpen(false)} />
          <Button
            title={"Save"}
            onClick={() => {
              setIsOpen(false);
              addPlanToDb(newPlan, ["user_tools", "training_plan"]);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateNewPlan;
