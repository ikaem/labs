import {
  AddFileAction,
  AddFolderAction,
  ChangeCurrentFolderAction,
  DeleteItemAction,
  FilesystemState,
  Folder,
  JumpToPathAction,
  LoadFilesystemAction,
  ModifyFileAction,
  ModifyFolderAction,
  NavigateBackAction,
  NavigateToFolderAction,
  TextFile,
} from '../types';

export enum FilesystemActionTypes {
  LOAD_FILESYSTEM = 'load_filesystem',
  CHANGE_CURRENT_FOLDER = 'set_current_folder',
  NAVIGATE_TO_PATH = 'navigate_to_path',
  NAVIGATE_BACK = 'navigate_back',
  JUMP_TO_PATH = 'jump_to_path',
  ADD_FILE = 'add_file',
  MODIFY_FILE = 'modify_file',
  ADD_FOLDER = 'add_folder',
  MODIFY_FOLDER = 'modify_folder',
  DELETE_ITEM = 'delete_item',
}

export const loadFilesystem = (
  filesystem: FilesystemState
): LoadFilesystemAction => {
  return {
    type: FilesystemActionTypes.LOAD_FILESYSTEM,
    payload: filesystem,
  };
};

export const changeCurrentFolder = (): ChangeCurrentFolderAction => {
  return {
    type: FilesystemActionTypes.CHANGE_CURRENT_FOLDER,
  };
};

export const navigateToFolder = (folder: Folder): NavigateToFolderAction => {
  return {
    type: FilesystemActionTypes.NAVIGATE_TO_PATH,
    payload: folder,
  };
};

export const navigateBack = (): NavigateBackAction => {
  return {
    type: FilesystemActionTypes.NAVIGATE_BACK,
  };
};

export const jumpToPath = (id: number): JumpToPathAction => {
  return {
    type: FilesystemActionTypes.JUMP_TO_PATH,
    payload: id,
  };
};

export const addFile = (file: TextFile): AddFileAction => {
  return {
    type: FilesystemActionTypes.ADD_FILE,
    payload: file,
  };
};

export const modifyFile = (file: TextFile): ModifyFileAction => {
  return {
    type: FilesystemActionTypes.MODIFY_FILE,
    payload: file,
  };
};

export const addFolder = (folder: Folder): AddFolderAction => {
  return {
    type: FilesystemActionTypes.ADD_FOLDER,
    payload: folder,
  };
};

export const modifyFolder = (folder: Folder): ModifyFolderAction => {
  return {
    type: FilesystemActionTypes.MODIFY_FOLDER,
    payload: folder,
  };
};

export const removeItem = (id: string): DeleteItemAction => {
  return {
    type: FilesystemActionTypes.DELETE_ITEM,
    payload: id,
  };
};
