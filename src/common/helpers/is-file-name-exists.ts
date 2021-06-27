import {
  FilesystemTypes,
  Folder,
  TextFile,
} from '../../services/filesystem/types';

export const isFileNameExists = (
  name: string,
  type: FilesystemTypes,
  currentFolder: (Folder | TextFile)[]
) => {
  if (
    currentFolder.find((e) => {
      return e.type === type && e.name === name;
    })
  )
    return true;

  return false;
};
