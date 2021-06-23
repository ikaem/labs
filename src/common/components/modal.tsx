interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isModalOpen,
  closeModal,
}) => {
  // TODO style this thing, to make it actual modal
  if (!isModalOpen) return null;
  return (
    <div>
      <button onClick={closeModal}>Close</button>
      {children}
    </div>
  );
};
