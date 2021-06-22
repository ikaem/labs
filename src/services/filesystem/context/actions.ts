import { Folder, NavigateToFolderAction } from '../types';

export enum FilesystemActionTypes {
  NAVIGATE_TO_PATH = 'navigate_to_path',
}

export const navigateToFolder = (folder: Folder): NavigateToFolderAction => {
  return {
    type: FilesystemActionTypes.NAVIGATE_TO_PATH,
    payload: folder,
  };
};
