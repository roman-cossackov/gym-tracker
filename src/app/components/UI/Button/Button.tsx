import styles from "./Button.module.css";

type Props = {
    title: string;
    onClick: () => void;
};

const Button = ({ title, onClick }: Props) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {title}
        </button>
    );
};

export default Button;
