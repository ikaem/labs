import { useContext, useEffect } from 'react';
import { FilesystemContext } from '..';
import { navigateToFolder } from '../context';
import {
  addFile,
  addFolder,
  changeCurrentFolder,
  jumpToPath,
  navigateBack,
} from '../context/actions';
import { Folder, TextFile } from '../types';

export const useFilesystem = () => {
  const { filesystemState, dispatchFilesystemState } =
    useContext(FilesystemContext);

  const { currentFolder, currentPath, root } = filesystemState;

  const setCurrentFolder = () => {
    return dispatchFilesystemState(changeCurrentFolder());
  };

  const goToFolder = (folder: Folder) => {
    return dispatchFilesystemState(navigateToFolder(folder));
  };

  // TODO open file - maybe have some openedFiles array state - and push inside - or maybe set state somewhere else, or maybe somewhere in the running apps - type and so on
  // TODO or maybe do keep openFiles state here
  // and then the installed text app will be checking that, to open one if needed - and then whichever is first in the array, will be shown first

  const openFile = (textFile: TextFile) => {
    // TODO make action for this, and dispatch
    // TODO action should add the file the the currentFiles array
  };
  const goBack = () => {
    return dispatchFilesystemState(navigateBack());
  };

  const jumpToFolder = (id: number) => {
    return dispatchFilesystemState(jumpToPath(id));
  };

  const createFile = (name: string, content: string) => {
    return dispatchFilesystemState(addFile(name, content));
  };

  const createFolder = (name: string) => {
    return dispatchFilesystemState(addFolder(name));
  };

  useEffect(() => {
    setCurrentFolder();
  }, [currentPath, root]);

  return {
    currentFolder,
    currentPath,
    root,
    setCurrentFolder,
    goToFolder,
    openFile,
    goBack,
    jumpToFolder,
    createFile,
    createFolder,
  };
};
