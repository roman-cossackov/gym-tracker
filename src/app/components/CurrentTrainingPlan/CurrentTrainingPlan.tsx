import styles from "./CurrentTrainingPlan.module.css";
import { useDatabase } from "@/app/context/FirestoreContext";
import CreateNewPlan from "./CreateNewPlan'/CreateNewPlan";
import Accordion from "../UI/Accordion/Accordion";

type Props = {};

const CurrentTrainingPlan = (props: Props) => {
  const { trainingPlanQuery } = useDatabase();
  const planData = trainingPlanQuery.data?.["Тренировочный план"];

  const plan = trainingPlanQuery.isPending ? (
    <p>Loading...</p>
  ) : (
    <>
      <Accordion title={planData.title}>
        <ul>
          {planData.blocks.map((block) => (
            <li key={block.id}>
              <Accordion title={`Блок ${block.id}`}>
                <ul>
                  {block.microblocks.map((microblock) => (
                    <li key={microblock.id}>
                      <Accordion title={`Микроблок ${microblock.id}`}>
                        <ul>
                          {microblock.days.map((day) => (
                            <li key={day.id}>
                              <Accordion title={`День ${day.id}`}>
                                <ul>
                                  {day.exercises.map((exercise) => (
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
      </Accordion>
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
