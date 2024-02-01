import styles from "./CurrentTrainingPlan.module.css";
import { useDatabase } from "@/context/FirestoreContext";
import CreateNewPlan from "./CreateNewPlan/CreateNewPlan";
import Accordion from "../UI/Accordion/Accordion";
import type { block, exercise } from "./types";

type Props = {};

const CurrentTrainingPlan = (props: Props) => {
  /* Здесь отображается план. Можно его поменять вручную нажав на кнопку Change Plan. 
    Можно формировать его автоматически, добавляя по одному дню каждую тренировку*/
  const { trainingPlanQuery } = useDatabase();
  const planData = trainingPlanQuery.data?.["Тренировочный план"];
  const plan = trainingPlanQuery.isPending ? (
    <p>Loading...</p>
  ) : trainingPlanQuery.isError ? (
    <p>Training plan query error</p>
  ) : (
    <>
      {planData.title}
        <ul>
          {planData.blocks.map((block: block) => (
            <li key={block.id}>
              <Accordion title={`Блок ${block.id}`} isDropdownOpenInitialValue={true}>
                <ul>
                  {block.microblocks.map((microblock) => (
                    <li key={microblock.id}>
                      <Accordion title={`Микроблок ${microblock.id}`} isDropdownOpenInitialValue={true}>
                        <ul>
                          {microblock.days.map((day) => (
                            <li key={day.id}>
                              <Accordion title={`День ${day.id}`} isDropdownOpenInitialValue={true}>
                                <ul>
                                  {day.exercises.map((exercise: exercise) => (
                                    <li key={exercise.id}>{exercise.title}</li>
                                  ))}
                                </ul>
                              </Accordion>
                            </li>
                          ))}
                        </ul>
                      </Accordion>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </li>
          ))}
        </ul>
    </>
  );

  return (
    <>
      <h3 className={styles.date}>November 7 2023, tuesday</h3>
      <div className={styles.container}>{plan}</div>
      <CreateNewPlan />
    </>
  );
};

export default CurrentTrainingPlan;
