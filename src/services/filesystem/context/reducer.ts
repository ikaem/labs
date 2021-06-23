import {
  AddFileAction,
  AddFolderAction,
  ChangeCurrentFolderAction,
  FilesystemState,
  JumpToPathAction,
  NavigateBackAction,
  NavigateToFolderAction,
} from '../types';
import { FilesystemActionTypes } from '.';
import { getCurrentFolderContents } from '../../../common';

// TODO type aciton
export type AllActions =
  | ChangeCurrentFolderAction
  | NavigateToFolderAction
  | NavigateBackAction
  | JumpToPathAction
  | AddFileAction
  | AddFolderAction;

export const reducer = (state: FilesystemState, action: AllActions) => {
  switch (action.type) {
    case FilesystemActionTypes.CHANGE_CURRENT_FOLDER: {
      const currentFolder = getCurrentFolderContents(
        state.root.content,
        state.currentPath
      );
      return {
        ...state,
        currentFolder: getCurrentFolderContents(
          state.root.content,
          state.currentPath
        ),
      };
    }

    case FilesystemActionTypes.NAVIGATE_TO_PATH: {
      return {
        ...state,
        currentPath: [...state.currentPath, action.payload.name],
      };
    }
    case FilesystemActionTypes.NAVIGATE_BACK: {
      return {
        ...state,
        currentPath: state.currentPath.slice(0, state.currentPath.length - 1),
      };
    }
    case FilesystemActionTypes.JUMP_TO_PATH: {
      return {
        ...state,
        currentPath: state.currentPath.slice(0, action.payload + 1),
      };
    }

    case FilesystemActionTypes.ADD_FILE: {
      const newState = { ...state };
      const currentFolderContents = getCurrentFolderContents(
        newState.root.content,
        newState.currentPath
      );
      currentFolderContents.push(action.payload);
      return newState;
    }

    case FilesystemActionTypes.ADD_FOLDER: {
      const newState = { ...state };
      const currentFolderContents = getCurrentFolderContents(
        newState.root.content,
        newState.currentPath
      );
      currentFolderContents.push(action.payload);
      return newState;
    }
    default:
      return state;
  }
};
