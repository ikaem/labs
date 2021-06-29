import { useState, useRef, useEffect } from 'react';
import { Folder, FilesystemTypes } from '../../../services/filesystem/types';
import { VALID_FILE_FOLDER_NAME_EXPRESSION } from '../../constants';
import { Modal, ModalProps } from '../modal';

export interface FolderEditorModalProps extends ModalProps, FolderEditorProps {}

export const FolderEditorModal: React.FC<Partial<FolderEditorModalProps>> = ({
  modalTitle,
  isModalOpen,
  closeModal,
  submitFolder,
  folder,
}) => {
  return (
    <Modal
      modalTitle={modalTitle!}
      isModalOpen={isModalOpen!}
      closeModal={closeModal!}
    >
      <FolderEditor
        submitFolder={submitFolder!}
        cancelEditFolder={closeModal!}
        folder={folder}
      />
    </Modal>
  );
};

interface FolderEditorProps {
  submitFolder: (folder: Folder) => void;
  cancelEditFolder: (e: React.MouseEvent<Element, MouseEvent>) => void;
  folder?: Folder;
}
function FolderEditor({
  submitFolder,
  cancelEditFolder,
  folder,
}: FolderEditorProps) {
  const [editedFolder, setEditedFolder] = useState<Folder>({
    id: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    content: [],
    type: FilesystemTypes.FOLDER,
  });

  const [isNameTouched, setIsNameTouched] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (folder) setEditedFolder(folder);
  }, [folder]);

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  const isInvalidInput = !VALID_FILE_FOLDER_NAME_EXPRESSION.test(
    editedFolder.name
  );
  const isErrorMessageShown = isNameTouched && isInvalidInput;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInvalidInput) return setIsNameTouched(true);

    submitFolder(editedFolder);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditedFolder((prev) => ({
      ...prev,
      name: value,
    }));

    setIsNameTouched(true);
  };

  return (
    <div className='add-folder'>
      <form className='add-folder_form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Folder name</label>
          <input
            type='text'
            ref={nameRef}
            id='name'
            required
            name='name'
            value={editedFolder.name}
            onChange={handleChange}
          />
          {isErrorMessageShown && (
            <div className='text-error'>Valid folder name is required</div>
          )}
        </div>

        <div className='form_actions'>
          <button type='submit' className='actions_btn submit-btn'>
            {folder ? 'Update' : 'Add'}
          </button>
          <button
            type='button'
            className='actions_btn cancel-btn'
            onClick={cancelEditFolder}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
