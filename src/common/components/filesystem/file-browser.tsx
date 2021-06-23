import { useMemo, useState } from 'react';
import { FileEditor, Modal } from '..';

import { useFilesystem } from '../../../services/filesystem/';
import { Folder } from '../../../services/filesystem/types';

interface FileBrowserProps {
  //   currentPath: string[];
  //   curentFolder: (Folder | String)[];
}

export const FileBrowser: React.FC<FileBrowserProps> = () => {
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

  const renderedFilesAndFolers = useMemo(
    () =>
      currentFolder.map((e) => (
        //   TODO add key, make some unique id
        // TODO this should be a table
        <div onClick={() => (e.type === 'folder' ? goToFolder : openFile)}>
          {e.name}
        </div>
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
          <li onClick={() => jumpToFolder(i + 1)}>{e}</li>
        ))}
      </ul>
    );
  }, [
    // root - maybe not needed
    currentPath,
  ]);

  return (
    <div className='file-browser'>
      {renderedCurrentPath}
      <button onClick={goBack}>
        {/* TODO add that icon here isntead of button */}
        Back
      </button>

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

      {/* {showTextFile && (
        <div>
          <p
            onClick={() => {
              setFileSystem((prev: any) => ({
                ...prev,
                currentText: null,
              }));
              setShowTextFile(false);
            }}
          >
            X
          </p>
          <p>{fileSystem.currentText}</p>
        </div>
      )} */}
    </div>
  );
};
