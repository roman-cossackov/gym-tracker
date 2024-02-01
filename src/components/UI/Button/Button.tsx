import styles from "./Button.module.css";

export enum ButtonTheme {
    BLUE = "blue",
    ADD = "add",
}

type Props = {
    title: string;
    onClick: () => void;
    style?: ButtonTheme;
};

const Button = ({ title, onClick, style = ButtonTheme.BLUE }: Props) => {
    return (
        <button className={styles['button-' + style]} onClick={onClick}>
            {title}
        </button>
    );
};

export default Button;
