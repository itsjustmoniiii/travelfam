import styles from "../styles/AuthForm.module.css";

interface TextareaProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  disabled,
  label,
  onChange,
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
        <textarea
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          className={styles.input_text}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Textarea;
