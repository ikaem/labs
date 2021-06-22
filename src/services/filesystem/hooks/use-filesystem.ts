import { useContext } from 'react';
import { FilesystemContext } from '..';
import { navigateToFolder } from '../context';
import { Folder } from '../types';

export const useFilesystem = () => {
  const { filesystemState, dispatchFilesystemState } =
    useContext(FilesystemContext);

  const goToFolder = (folder: Folder) => {
    return navigateToFolder(folder);
  };

  return {
    goToFolder,
  };
};
