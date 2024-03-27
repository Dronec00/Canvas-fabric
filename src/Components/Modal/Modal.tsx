import styles from "./Modal.module.scss";
import { Portal } from "./Portal";
import cross from "../../img/cross.svg"

interface ModalProps {
    handleModalActive: (value: boolean) => void,
    convertToSVG: () => string,
    isOpen: boolean
}

const Modal = ({ handleModalActive, convertToSVG, isOpen }: ModalProps) => {
    return (
      <Portal>
        {isOpen && (
          <div className={styles.background}>
            <div className={styles.modal}>
              <div className={styles.modal__svgcode}>{convertToSVG()}</div>
              <button
                className={styles.modal__close}
                onClick={() => handleModalActive(false)}
              >
                <img src={cross} alt="close" />
              </button>
            </div>
          </div>
        )}
      </Portal>
    );
  };

export default Modal;