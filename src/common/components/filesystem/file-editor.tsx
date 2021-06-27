import { useState, useEffect } from 'react';
import { OptionalChain } from 'typescript';
import { Modal } from '..';
import { TextFile, FilesystemTypes } from '../../../services/filesystem/types';
import { VALID_FILE_FOLDER_NAME_EXPRESSION } from '../../constants';
import { ModalProps } from '../modal';

export interface FileEditorModalProps extends ModalProps, FileEditorProps {}

export const FileEditorModal: React.FC<Partial<FileEditorModalProps>> = ({
  modalTitle,
  isModalOpen,
  closeModal,
  submitFile,
  textFile,
}) => {
  return (
    <Modal
      modalTitle={modalTitle!}
      isModalOpen={isModalOpen!}
      closeModal={closeModal!}
    >
      <FileEditor
        submitFile={submitFile!}
        cancelEditFile={closeModal!}
        textFile={textFile}
      />
    </Modal>
  );
};

interface FileEditorProps {
  // TODO type this properly
  submitFile: (textFile: TextFile) => void;
  cancelEditFile: (e: React.MouseEvent<Element, MouseEvent>) => void;
  textFile?: TextFile;
}
function FileEditor({ submitFile, cancelEditFile, textFile }: FileEditorProps) {
  const [editedFile, setEditedFile] = useState<TextFile>({
    id: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    content: '',
    type: FilesystemTypes.TEXT_FILE,
  });
  const [isNameTouched, setIsNameTouched] = useState(false);

  useEffect(() => {
    if (textFile) setEditedFile(textFile);
  }, [textFile]);

  const isInvalidNameInput = !VALID_FILE_FOLDER_NAME_EXPRESSION.test(
    editedFile.name
  );
  const isErrorMessageShown = isNameTouched && isInvalidNameInput;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInvalidNameInput) return setIsNameTouched(true);

    // TODO here we add the file to the state
    // CAL
    submitFile(editedFile);
    console.log('meh');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    console.log('here', { name, value });
    setEditedFile((prev) => ({ ...prev, [name]: value }));
    if (name === 'name') setIsNameTouched(true);
  };

  return (
    <div className='add-file'>
      <form className='add-file_form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>File name</label>
          <input
            type='text'
            id='name'
            required
            name='name'
            value={editedFile.name}
            onChange={handleChange}
          />
          {isErrorMessageShown && (
            <div className='text-error'>Valid file name is required</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Content</label>
          <textarea
            id='content'
            required
            name='content'
            value={editedFile.content}
            onChange={handleChange}
            rows={15}
          />
        </div>
        {/* TODO make this a custom button */}
        {/* TODO maybe use as a start button, too */}

        <div className='form_actions'>
          <button type='submit' className='actions_btn submit-btn'>
            {textFile ? 'Update' : 'Add'}
          </button>
          <button
            type='button'
            className='actions_btn cancel-btn'
            onClick={cancelEditFile}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
