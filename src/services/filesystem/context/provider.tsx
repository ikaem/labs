import { createContext, Dispatch, useReducer } from 'react';
import { reducer } from '.';
import { FilesystemState, NavigateToFolderAction } from '../types';
import { AllActions } from './reducer';

// TODO interface move to types

// TODO type this
export const initialFilesystemState: FilesystemState = {
  // TODO not sure about this, leave comment
  currentFiles: [],
  currentFolder: [],
  currentPath: [],
  root: {
    type: 'folder',
    name: 'My filesystem',
    createdAt: '2022-06-22',
    updatedAt: '2022-06-22',
    content: [],
  },
};

export const FilesystemContext = createContext<{
  filesystemState: FilesystemState;
  dispatchFilesystemState: Dispatch<AllActions>;
}>({
  filesystemState: initialFilesystemState,
  dispatchFilesystemState: () => {},
});

export const FileSystemProvider: React.FC = ({ children }) => {
  const [filesystemState, dispatchFilesystemState] = useReducer(
    reducer,
    initialFilesystemState
  );

  return (
    <FilesystemContext.Provider
      value={{ filesystemState, dispatchFilesystemState }}
    >
      {children}
    </FilesystemContext.Provider>
  );
};
