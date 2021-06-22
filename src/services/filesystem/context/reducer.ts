import { FilesystemState, NavigateToFolderAction } from '../types';
import { FilesystemActionTypes } from '.';

// TODO type aciton
type AllActions = NavigateToFolderAction;

export const reducer = (state: FilesystemState, action: AllActions) => {
  switch (action.type) {
    case FilesystemActionTypes.NAVIGATE_TO_PATH: {
      return {
        ...state,
        currentPath: [...state.currentPath, action.payload.name],
      };
    }
    default:
      return state;
  }
};
