import styles from "./RequeredListItem.module.css";
import Accordion from "../Accordion/Accordion";
import ListItem from "../ListItem/ListItem";
import IconButton from "../IconButton/IconButton";

interface RequeredListItemProps {
  title: string;
  content: JSX.Element[];
  onClick: () => void;
}

const RequeredListItem = ({
  title,
  content,
  onClick,
}: RequeredListItemProps) => {
  return (
    <li>
      <div className={styles.cogButton}>
        <IconButton icon="cog" buttonFunction={onClick} />
      </div>
      <div className={styles.content}>
        <Accordion title={title} isDropdownOpenInitialValue={false}>
          {content}
        </Accordion>
      </div>
    </li>
  );
};

export default RequeredListItem;
