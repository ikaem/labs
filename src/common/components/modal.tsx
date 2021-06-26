import { CloseIcon } from './icons';

interface ModalProps {
  isModalOpen: boolean;
  closeModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
  modalTitle: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isModalOpen,
  closeModal,
  modalTitle,
}) => {
  if (!isModalOpen) return null;
  return (
    <div className='modal'>
      <div className='modal_backdrop' onClick={closeModal}></div>
      <div className='modal_wrapper'>
        <div className='modal_content'>
          <header className='modal_header'>
            <h2>{modalTitle}</h2>
            <button onClick={closeModal}>
              <CloseIcon className='icon' />
            </button>
          </header>
          <div className='modal_app'>{children}</div>
        </div>
      </div>
    </div>
  );
};
