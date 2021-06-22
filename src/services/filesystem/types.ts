import { FilesystemActionTypes } from './context/actions';

export interface NavigateToFolderAction {
  type: FilesystemActionTypes.NAVIGATE_TO_PATH;
  payload: Folder;
}

export interface Folder {
  type: 'folder';
  name: string;
  createdAt: string;
  updatedAt: string;
  content: Folder[] | TextFile[];
}

export interface TextFile {
  type: 'folder';
  name: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface FilesystemState {
  currentFolder: Folder[];
  currentPath: string[];
  root: Folder;
}
