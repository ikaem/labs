import { FilesystemActionTypes } from './context/actions';

export interface ChangeCurrentFolderAction {
  type: FilesystemActionTypes.CHANGE_CURRENT_FOLDER;
}

export interface NavigateToFolderAction {
  type: FilesystemActionTypes.NAVIGATE_TO_PATH;
  payload: Folder;
}

export interface NavigateBackAction {
  type: FilesystemActionTypes.NAVIGATE_BACK;
}

export interface JumpToPathAction {
  type: FilesystemActionTypes.JUMP_TO_PATH;
  payload: number;
}

export interface AddFileAction {
  type: FilesystemActionTypes.ADD_FILE;
  payload: TextFile;
}

export interface AddFolderAction {
  type: FilesystemActionTypes.ADD_FOLDER;
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
  type: 'text';
  name: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface FilesystemState {
  currentFolder: (Folder | TextFile)[];
  currentPath: string[];
  root: Folder;
}
