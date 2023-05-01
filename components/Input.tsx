import { IconType } from "react-icons";
import styles from "../styles/AuthForm.module.css";

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  icon?: IconType;
  onClickIcon?: () => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type = "text",
  onChange,
  disabled,
  label,
  icon: Icon,
  onClickIcon,
}) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          htmlFor="username"
          className="text-left text-gray-500 text-[16px]"
        >
          {label}
        </label>
      )}
      <div className={styles.input_group}>
        <input
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          className={styles.input_text}
        />
        {Icon && (
          <span className="icon flex items-center px-4">
            <Icon size={25} onClick={onClickIcon} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
