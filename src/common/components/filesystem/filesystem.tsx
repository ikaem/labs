import React, { useMemo, useState } from 'react';
import { FileEditor, Modal, BackIcon } from '..';

import { useFilesystem } from '../../../services/filesystem';
import { Folder } from '../../../services/filesystem/types';
import { NewFileIcon, NewFolderIcon } from '../icons';

interface FilesystemProps {
  //   currentPath: string[];
  //   curentFolder: (Folder | String)[];
}

export const Filesystem: React.FC<FilesystemProps> = () => {
  const [isCreateNewFolderShown, setIsCreateNewFolderShown] = useState(false);
  const [isFileEditorModalShown, setIsFileEditorModalShown] = useState(false);
  const {
    currentFolder,
    currentPath,
    goToFolder,
    openFile,
    jumpToFolder,
    goBack,
    createFile,
    createFolder,
  } = useFilesystem();

  const addFolder = (name: string) => {
    createFolder(name);
    setIsCreateNewFolderShown(false);
  };

  const closeNewFolderModal = (e: React.MouseEvent<Element, MouseEvent>) => {
    setIsCreateNewFolderShown(false);
  };

  const renderedFilesAndFolers = useMemo(
    () =>
      currentFolder.map((e) => (
        //   TODO add key, make some unique id

        <tr>
          <td>{'>>'}</td>
          <td
            onClick={() => (e.type === 'folder' ? goToFolder(e) : openFile(e))}
          >
            {e.name}
          </td>
          {/* <td>{e.name}</td> */}
          <td>{new Date(e.createdAt).toLocaleString()}</td>
          <td>{new Date(e.updatedAt).toLocaleString()}</td>
          <td>{'>>'}</td>
        </tr>
      )),
    [
      // root - maybe not needed // maybe it is to refresh the stuff in rendering files and folders
      currentFolder,
    ]
  );

  const renderedCurrentPath = useMemo(() => {
    return (
      <ul>
        {currentPath.map((e, i) => (
          <li onClick={() => jumpToFolder(i + 1)}>
            <span>{e}</span> /&nbsp;
          </li>
        ))}
      </ul>
    );
  }, [
    // root - maybe not needed
    currentPath,
  ]);

  return (
    <section className='filesystem'>
      <header className='filesystem_header'>
        <h2>File browser</h2>
        <div className='header_actions'>
          <button onClick={goBack}>
            <BackIcon className='folder-icon icon' title='Back' />
          </button>
          <NewFileIcon
            onClick={() => console.log('what')}
            className='new-file-icon icon'
            title='New file'
          />
          <>
            <NewFolderIcon
              onClick={() => setIsCreateNewFolderShown(true)}
              className='new-folder-icon icon'
              title='New folder'
            />
            {/* TODO testing */}
            {/* TODO close modal actually will need to clean up some things, too? */}
            <Modal
              modalTitle='add folder'
              isModalOpen={isCreateNewFolderShown}
              closeModal={closeNewFolderModal}
            >
              <AddFolder
                addFolder={addFolder}
                cancelAddFolder={closeNewFolderModal}
              />
            </Modal>
          </>
        </div>
      </header>
      <div className='filesystem_path-container'>{renderedCurrentPath}</div>

      <div className='filesystem_table'>
        <table>
          <thead>
            <tr>
              <th />
              <th scope='col'>Name</th>
              <th scope='col'>Created</th>
              <th scope='col'>Updated</th>
              <th />
            </tr>
          </thead>
          <tbody>{renderedFilesAndFolers}</tbody>
        </table>
      </div>
    </section>
  );
};

interface AddFolderProps {
  // TODO type this properly
  addFolder: (name: string) => void;
  cancelAddFolder: (e: React.MouseEvent<Element, MouseEvent>) => void;
}
function AddFolder({ addFolder, cancelAddFolder }: AddFolderProps) {
  const [nameInput, setNameInput] = useState({
    value: '',
    isTouched: false,
  });

  const isInvalidInput = !/^[a-zA-Z].*/.test(nameInput.value);
  const isErrorMessageShown = nameInput.isTouched && isInvalidInput;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInvalidInput)
      return setNameInput((prev) => ({ ...prev, isTouched: true }));

    // addFolder(nameInput.value);
    console.log('meh');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log('name', value);
    setNameInput({ value, isTouched: true });
  };

  return (
    <div className='add-folder'>
      <form className='add-folder_form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Folder name</label>
          <input
            type='text'
            id='name'
            // required
            name='name'
            value={nameInput.value}
            onChange={handleChange}
          />
          {isErrorMessageShown && (
            <div className='text-error'>Valid folder name is required</div>
          )}
        </div>
        {/* TODO make this a custom button */}
        {/* TODO maybe use as a start button, too */}

        <div className='form_actions'>
          <button type='submit' className='actions_btn submit-btn'>
            Add
          </button>
          <button
            type='button'
            className='actions_btn cancel-btn'
            onClick={cancelAddFolder}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
