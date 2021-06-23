import { Folder, TextFile } from '../../services/filesystem/types';

export const getCurrentFolderContents = (
  rootContents: (Folder | TextFile)[],
  currentPath: string[]
) => {
  let currentFolderContents = rootContents;
  for (const path of currentPath) {
    const i = currentFolderContents.findIndex((e) => {
      e.name === path && e.type === 'folder';
    });
    currentFolderContents = currentFolderContents[i].content as Folder[];
  }

  return currentFolderContents;
};
