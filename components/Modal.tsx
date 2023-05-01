import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  submitBtnLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  submitBtnLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    //if btn is disabled
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    //if submit btn is disabled
    if (disabled) {
      return;
    }
    //otherwise
    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
        justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
      "
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/* NOTE: content*/}
          <div
            className="
          h-full
          lg:h-auto
          border-0 
          rounded-lg 
          shadow-lg 
          relative 
          flex 
          flex-col 
          w-full 
          bg-black 
          outline-none 
          focus:outline-none
          "
          >
            {/* NOTE: header*/}
            <div
              className="
            flex 
            items-center 
            justify-between 
            p-10 
            rounded-t
            "
            >
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                className="
                p-1 
                ml-auto
                border-0 
                text-white 
                hover:opacity-70
                transition
              "
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-10 flex-auto">{body}</div>
            {/*footer*/}
            <div className="p-10 flex items-end w-[50%] mx-auto">
              <Button
                disabled={disabled}
                label={submitBtnLabel}
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
