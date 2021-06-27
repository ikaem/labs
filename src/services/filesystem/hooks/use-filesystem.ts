import { useContext, useEffect, useState } from 'react';
import id from 'uniqid';
import {
  FilesystemContext,
  addFile,
  addFolder,
  changeCurrentFolder,
  jumpToPath,
  navigateBack,
  navigateToFolder,
  modifyFile,
  modifyFolder,
  removeItem,
} from '..';
import {
  FolderEditorModalProps,
  FileEditorModalProps,
} from '../../../common/components/filesystem';
import { FilesystemSort, Folder, TextFile } from '../types';

export const useFilesystem = () => {
  const [filesystemSort, setFilesystemSort] = useState<FilesystemSort>({
    sortBy: 'name',
    order: 'desc',
  });

  const { filesystemState, dispatchFilesystemState } =
    useContext(FilesystemContext);
  const { currentFolder, currentPath, root } = filesystemState;

  const [editFolderControl, setEditFolderControl] =
    useState<FolderEditorModalProps | null>(null);

  const [editFileControl, setEditFileControl] =
    useState<FileEditorModalProps | null>(null);

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

  const createFile = (textFile: TextFile) => {
    textFile.id = id();
    textFile.createdAt = textFile.updatedAt = new Date().toISOString();
    dispatchFilesystemState(addFile(textFile));
    setEditFileControl(null);
  };

  const updateFile = (textFile: TextFile) => {
    textFile.updatedAt = new Date().toISOString();

    dispatchFilesystemState(modifyFile(textFile));
    setEditFileControl(null);
  };

  const createFolder = (folder: Folder) => {
    folder.id = id();
    folder.createdAt = folder.updatedAt = new Date().toISOString();

    dispatchFilesystemState(addFolder(folder));
    setEditFolderControl(null);
  };

  const updateFolder = (folder: Folder) => {
    folder.updatedAt = new Date().toISOString();

    dispatchFilesystemState(modifyFolder(folder));
    setEditFolderControl(null);
  };

  const deleteItem = (id: string) => {
    console.log('id', id);
    dispatchFilesystemState(removeItem(id));
  };

  const sortItems = (sortBy: FilesystemSort['sortBy']) => {
    const order =
      sortBy === filesystemSort.sortBy
        ? filesystemSort.order === 'desc'
          ? 'asc'
          : 'desc'
        : 'desc';

    setFilesystemSort({ sortBy, order });
  };

  function startEditFolder(modalTitle: string, type: 'create'): void;
  function startEditFolder(
    modalTitle: string,
    type: 'edit',
    folder: Folder
  ): void;
  function startEditFolder(
    modalTitle: string,
    type: string,
    folder?: Folder
  ): void {
    const config: FolderEditorModalProps = {
      modalTitle,
      isModalOpen: true,
      closeModal: () => setEditFolderControl(null),
      cancelEditFolder: () => setEditFolderControl(null),
      submitFolder: type === 'edit' ? updateFolder : createFolder,
      folder,
    };

    setEditFolderControl(config);
  }

  function startEditFile(modalTitle: string, type: 'create'): void;
  function startEditFile(
    modalTitle: string,
    type: 'edit',
    textFile: TextFile
  ): void;
  function startEditFile(
    modalTitle: string,
    type: string,
    textFile?: TextFile
  ): void {
    const config: FileEditorModalProps = {
      modalTitle,
      isModalOpen: true,
      closeModal: () => setEditFileControl(null),
      cancelEditFile: () => setEditFileControl(null),
      submitFile: type === 'edit' ? updateFile : createFile,
      textFile,
    };

    setEditFileControl(config);
  }

  console.log('file and folder', currentFolder);

  useEffect(() => {
    setCurrentFolder();
  }, [currentPath, root]);

  useEffect(() => {
    const { sortBy, order } = filesystemSort;

    currentFolder.sort((a, b) => {
      switch (sortBy) {
        case 'updatedAt':
        case 'createdAt': {
          if (order === 'desc')
            return Number(a[sortBy]) > Number(b[sortBy]) ? 1 : -1;
          return Number(a[sortBy]) < Number(b[sortBy]) ? 1 : -1;
        }
        case 'type':
        case 'name': {
          if (order === 'desc')
            return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
          return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1;
        }

        default:
          return 1;
      }
    });
  }, [filesystemSort]);

  return {
    currentFolder,
    currentPath,
    root,
    setCurrentFolder,
    goToFolder,
    goBack,
    jumpToFolder,
    deleteItem,
    sortItems,
    filesystemSort,
    editFileControl,
    editFolderControl,
    startEditFile,
    startEditFolder,
  };
};
