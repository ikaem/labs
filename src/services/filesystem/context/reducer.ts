import {
  AddFileAction,
  AddFolderAction,
  ChangeCurrentFolderAction,
  FilesystemState,
  JumpToPathAction,
  NavigateBackAction,
  NavigateToFolderAction,
  ModifyFileAction,
  ModifyFolderAction,
  DeleteItemAction,
  LoadFilesystemAction,
} from '../types';
import { FilesystemActionTypes } from '.';
import { getCurrentFolderContents } from '../../../common/helpers';

// TODO type aciton
export type AllActions =
  | ChangeCurrentFolderAction
  | NavigateToFolderAction
  | NavigateBackAction
  | JumpToPathAction
  | AddFileAction
  | AddFolderAction
  | ModifyFolderAction
  | ModifyFileAction
  | DeleteItemAction
  | LoadFilesystemAction;

export const reducer = (state: FilesystemState, action: AllActions) => {
  switch (action.type) {
    case FilesystemActionTypes.LOAD_FILESYSTEM: {
      return action.payload;
    }

    case FilesystemActionTypes.CHANGE_CURRENT_FOLDER: {
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

        currentPath:
          action.payload === 0
            ? []
            : state.currentPath.slice(0, action.payload),
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

    case FilesystemActionTypes.MODIFY_FILE: {
      const newState = { ...state };
      const currentFolderContents = getCurrentFolderContents(
        newState.root.content,
        newState.currentPath
      );

      const fileIndex = currentFolderContents.findIndex(
        (f) => f.id === action.payload.id
      );
      currentFolderContents[fileIndex] = action.payload;
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

    case FilesystemActionTypes.MODIFY_FOLDER: {
      const newState = { ...state };
      const currentFolderContents = getCurrentFolderContents(
        newState.root.content,
        newState.currentPath
      );

      const folderIndex = currentFolderContents.findIndex(
        (f) => f.id === action.payload.id
      );
      currentFolderContents[folderIndex] = action.payload;
      return newState;
    }

    case FilesystemActionTypes.DELETE_ITEM: {
      const newState = { ...state };
      const currentFolderContents = getCurrentFolderContents(
        newState.root.content,
        newState.currentPath
      );

      const newArray = currentFolderContents.filter(
        (i) => i.id !== action.payload
      );

      currentFolderContents.length = 0;
      currentFolderContents.push(...newArray);

      return newState;
    }

    default:
      return state;
  }
};
