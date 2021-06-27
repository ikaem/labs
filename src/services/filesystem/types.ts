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

export interface ModifyFileAction {
  type: FilesystemActionTypes.MODIFY_FILE;
  payload: TextFile;
}

export interface AddFolderAction {
  type: FilesystemActionTypes.ADD_FOLDER;
  payload: Folder;
}

export interface ModifyFolderAction {
  type: FilesystemActionTypes.MODIFY_FOLDER;
  payload: Folder;
}

export interface DeleteItemAction {
  type: FilesystemActionTypes.DELETE_ITEM;
  payload: string;
}

export interface LoadFilesystemAction {
  type: FilesystemActionTypes.LOAD_FILESYSTEM;
  payload: FilesystemState;
}

export enum FilesystemTypes {
  FOLDER = 'folder',
  TEXT_FILE = 'text',
}

export interface Folder {
  id: string;
  type: FilesystemTypes.FOLDER;
  name: string;
  createdAt: string;
  updatedAt: string;
  content: Folder[] | TextFile[];
}

export interface TextFile {
  id: string;
  type: FilesystemTypes.TEXT_FILE;
  name: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface FilesystemState {
  currentFiles: TextFile[];
  currentFolder: (Folder | TextFile)[];
  currentPath: string[];
  root: Folder;
}

export interface FilesystemSort {
  sortBy: 'type' | 'name' | 'createdAt' | 'updatedAt';
  order: 'desc' | 'asc';
}
