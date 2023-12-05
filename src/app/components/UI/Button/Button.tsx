import styles from "./Button.module.css";

type Props = {
    title: string;
    onClick: () => void;
    style: "blue" | "add"
};

const Button = ({ title, onClick, style }: Props) => {
    return (
        <button className={styles['button-' + style]} onClick={onClick}>
            {title}
        </button>
    );
};

export default Button;
