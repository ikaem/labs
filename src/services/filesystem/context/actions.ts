import {
  AddFileAction,
  AddFolderAction,
  ChangeCurrentFolderAction,
  Folder,
  JumpToPathAction,
  NavigateBackAction,
  NavigateToFolderAction,
} from '../types';

export enum FilesystemActionTypes {
  CHANGE_CURRENT_FOLDER = 'set_current_folder',
  NAVIGATE_TO_PATH = 'navigate_to_path',
  NAVIGATE_BACK = 'navigate_back',
  JUMP_TO_PATH = 'jump_to_path',
  ADD_FILE = 'add_file',
  ADD_FOLDER = 'add_folder',
}

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

export const addFile = (name: string, content: string): AddFileAction => {
  // check if file already exists in the current directory, but check it inside that function coming from the hook
  // TODO at this point, all is good already
  return {
    type: FilesystemActionTypes.ADD_FILE,
    payload: {
      name,
      content,
      type: 'text',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

export const addFolder = (name: string): AddFolderAction => {
  // check if file already exists in the current directory, but check it inside that function coming from the hook
  // TODO at this point, all is good already
  return {
    type: FilesystemActionTypes.ADD_FOLDER,
    payload: {
      name,
      content: [],
      type: 'folder',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};
