import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import {
  BackIcon,
  DeleteIcon,
  EditIcon,
  FolderIcon,
  NewFileIcon,
  NewFolderIcon,
  TextFileIcon,
} from '..';
import { useFilesystem } from '../../../services/filesystem';

import { FileEditorModal, FolderEditorModal } from '.';

interface FilesystemProps {
  //   currentPath: string[];
  //   curentFolder: (Folder | String)[];
}

export const Filesystem: React.FC<FilesystemProps> = () => {
  const {
    // TODO root might not needed
    root,
    currentFolder,
    currentPath,
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
  } = useFilesystem();

  const renderedFilesAndFolders = currentFolder.map((e) => (
    <tr key={e.id}>
      <td>{e.type === 'folder' ? <FolderIcon /> : <TextFileIcon />}</td>
      <td className='content-type-name'>
        <span
          onClick={() =>
            e.type === 'folder'
              ? goToFolder(e)
              : startEditFile('Edit file', 'edit', e)
          }
        >
          {e.name}
        </span>

        <EditIcon
          className='edit-icon icon'
          title='Edit'
          onClick={() =>
            e.type === 'folder'
              ? startEditFolder('Edit folder', 'edit', e)
              : startEditFile('Edit file', 'edit', e)
          }
        />
      </td>
      <td>{new Date(e.createdAt).toLocaleString()}</td>
      <td>{new Date(e.updatedAt).toLocaleString()}</td>
      <td>
        <button onClick={() => deleteItem(e.id)}>
          <DeleteIcon className='delete-icon icon' />
        </button>
      </td>
    </tr>
  ));

  const renderedCurrentPath = useMemo(() => {
    return (
      <ul>
        <li onClick={() => jumpToFolder(0)}>
          <span>My filesystem</span> /&nbsp;
        </li>
        {currentPath.map((e, i) => (
          <li key={i} onClick={() => jumpToFolder(i + 1)}>
            <span>{e}</span> /&nbsp;
          </li>
        ))}
      </ul>
    );
  }, [currentPath]);

  return (
    <>
      <section className='filesystem'>
        <header className='filesystem_header'>
          <h2>File browser</h2>
          <div className='header_actions'>
            <button
              style={{ display: currentPath.length ? 'inline' : 'none' }}
              onClick={goBack}
            >
              <BackIcon className='back-icon icon' title='Back' />
            </button>

            <button onClick={() => startEditFile('add file', 'create')}>
              <NewFileIcon className='new-file-icon icon' title='New file' />
            </button>

            <button onClick={() => startEditFolder('add folder', 'create')}>
              <NewFolderIcon
                className='new-folder-icon icon'
                title='New folder'
              />
            </button>
          </div>
        </header>
        <div className='filesystem_path-container'>{renderedCurrentPath}</div>

        <div className='filesystem_table'>
          <table>
            <thead>
              <tr>
                <th
                  className={`sorting-column ${clsx({
                    selected: filesystemSort.sortBy === 'type',
                    asc:
                      filesystemSort.sortBy === 'type' &&
                      filesystemSort.order === 'asc',
                  })}`}
                  onClick={() => sortItems('type')}
                >
                  Type
                </th>
                <th
                  className={`sorting-column ${clsx({
                    selected: filesystemSort.sortBy === 'name',
                    asc:
                      filesystemSort.sortBy === 'name' &&
                      filesystemSort.order === 'asc',
                  })}`}
                  scope='col'
                  onClick={() => sortItems('name')}
                >
                  Name
                </th>
                <th
                  className={`sorting-column ${clsx({
                    selected: filesystemSort.sortBy === 'createdAt',
                    asc:
                      filesystemSort.sortBy === 'createdAt' &&
                      filesystemSort.order === 'asc',
                  })}`}
                  scope='col'
                  onClick={() => sortItems('createdAt')}
                >
                  Created
                </th>
                <th
                  className={`sorting-column ${clsx({
                    selected: filesystemSort.sortBy === 'updatedAt',
                    asc:
                      filesystemSort.sortBy === 'updatedAt' &&
                      filesystemSort.order === 'asc',
                  })}`}
                  scope='col'
                  onClick={() => sortItems('updatedAt')}
                >
                  Updated
                </th>
                <th />
              </tr>
            </thead>
            <tbody>{renderedFilesAndFolders}</tbody>
          </table>
        </div>
      </section>
      <FileEditorModal
        modalTitle={editFileControl?.modalTitle}
        isModalOpen={editFileControl?.isModalOpen}
        closeModal={editFileControl?.closeModal}
        submitFile={editFileControl?.submitFile}
        textFile={editFileControl?.textFile}
      />
      <FolderEditorModal
        modalTitle={editFolderControl?.modalTitle}
        isModalOpen={editFolderControl?.isModalOpen}
        closeModal={editFolderControl?.closeModal}
        submitFolder={editFolderControl?.submitFolder}
        folder={editFolderControl?.folder}
      />
    </>
  );
};
