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
import { Folder } from '../types';

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
    goBack,
    jumpToFolder,
    createFile,
    createFolder,
  };
};
