import { useMemo, useState } from 'react';
import { FileEditor, Modal } from '..';

import { useFilesystem } from '../../../services/filesystem';
import { Folder } from '../../../services/filesystem/types';

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

  // console.log('cure', currentPath);

  const renderedFilesAndFolers = useMemo(
    () =>
      currentFolder.map((e) => (
        //   TODO add key, make some unique id

        <tr>
          <td>{'>>'}</td>
          <td onClick={() => (e.type === 'folder' ? goToFolder : openFile)}>
            {e.name}
          </td>
          {/* <td>{e.name}</td> */}
          <td>{new Date(e.createdAt).toLocaleString()}</td>
          <td>{new Date(e.updatedAt).toLocaleString()}</td>
          <td>{'>>'}</td>
        </tr>

        // <div onClick={() => (e.type === 'folder' ? goToFolder : openFile)}>
        //   {e.name}
        // </div>
      )),
    [
      // root - maybe not needed
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
          <span>{'<<'}</span>
          <span>{'<<'}</span>
          <span>{'<<'}</span>
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
          <tbody>
            {renderedFilesAndFolers}
            {/* <tr>
              <td>{'>>'}</td>
              <td>Folder name</td>
              <td>{new Date().toLocaleString()}</td>
              <td>{new Date().toLocaleString()}</td>
              <td>{'>>'}</td>
            </tr>
            <tr>
              <td>{'>>'}</td>
              <td>Folder name</td>
              <td>{new Date().toLocaleString()}</td>
              <td>{new Date().toLocaleString()}</td>
              <td>{'>>'}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </section>
  );

  /*   return (
    <div className='file-browser'>
      {renderedCurrentPath}
      <button onClick={goBack}>Back</button>

      <div>
        {isCreateNewFolderShown && (
          <>
            <form>
              <div className='form-group'>
                <label htmlFor='folderName'>Name</label>
                <input type='text' id='folderName' name='folderName' />
              </div>
            </form>
            <button
              type='button'
              onClick={() => createFolder('some name here')}
            >
              Add
            </button>
          </>
        )}
        <button
          onClick={() => setIsCreateNewFolderShown((prev) => !prev)}
          type='button'
        >
          {isCreateNewFolderShown ? 'Cancel' : 'Add new folder'}
        </button>
      </div>

      <button onClick={() => setIsFileEditorModalShown((prev) => !prev)}>
        {isFileEditorModalShown ? 'Cancel new file' : 'Add new file'}
      </button>
      {renderedFilesAndFolers}

      <Modal
        isModalOpen={isFileEditorModalShown}
        closeModal={() => setIsFileEditorModalShown(false)}
      >
        <FileEditor />
      </Modal>
    </div>
  ); */
};
