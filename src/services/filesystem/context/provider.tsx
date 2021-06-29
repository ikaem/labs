import { createContext, Dispatch, useReducer } from 'react';
import { reducer } from '.';
import { FilesystemState, FilesystemTypes } from '../types';
import { AllActions } from './reducer';

export const initialFilesystemState: FilesystemState = {
  currentFiles: [],
  currentFolder: [],
  currentPath: [],
  root: {
    id: '0',
    type: FilesystemTypes.FOLDER,
    name: 'My filesystem',
    createdAt: '2022-06-22',
    updatedAt: '2022-06-22',
    content: [
      {
        id: '1234',
        name: 'Test folder',
        content: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: FilesystemTypes.FOLDER,
      },
    ],
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
