import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [showTextFile, setShowTextFile] = useState(false);
  const [fileSystem, setFileSystem] = useState<any>({
    // currentPath: ['documents', 'my other folder'],
    currentText: null,
    currentFolder: null,
    currentPath: [],
    previousPath: '',
    root: [
      {
        type: 'folder',
        name: 'documents',
        createdAt: '2022-06-22',
        updatedAt: '2022-06-22',
        content: [
          {
            type: 'folder',
            name: 'my other folder',
            createdAt: '2022-06-22',
            updatedAt: '2022-06-22',
            content: [],
          },
          {
            type: 'folder',
            name: 'again some folder',
            createdAt: '2022-06-22',
            updatedAt: '2022-06-22',
            content: [],
          },
          {
            type: 'text',
            name: 'this is a text file',
            createdAt: '2022-06-22',
            updatedAt: '2022-06-22',
            content:
              'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, saepe sapiente. Illum pariatur, quasi iusto iste harum laudantium vel odit quidem eum consequuntur recusandae hic debitis, quam aperiam explicabo sequi',
          },
        ],
      },
      {
        type: 'folder',
        name: 'videos',
        createdAt: '2022-06-22',
        updatedAt: '2022-06-22',
        content: [
          {
            type: 'folder',
            name: 'my other folder ',
            createdAt: '2022-06-22',
            updatedAt: '2022-06-22',
          },
          {
            type: 'folder',
            name: 'again some folder',
            createdAt: '2022-06-22',
            updatedAt: '2022-06-22',
          },
        ],
      },
      {
        type: 'folder',
        name: 'images',
        createdAt: '2022-06-22',
        updatedAt: '2022-06-22',
        content: [],
      },
    ],
  });

  const getCurrentFolder = () => {
    let folder = fileSystem.root;
    for (const path of fileSystem.currentPath) {
      const i = folder.findIndex((e: any) => e.name === path);
      folder = folder[i].content;
    }

    return folder;
  };

  const onClickItem = () => {};

  useEffect(() => {
    console.log('state', fileSystem);
    console.log('currentPath', getCurrentFolder());
    setFileSystem((prev: any) => {
      return {
        ...prev,
        currentFolder: getCurrentFolder(),
      };
    });
  }, [fileSystem.currentPath]);

  useEffect(() => {
    if (!fileSystem.currentText) return;
    console.log('file system text', fileSystem);
    setShowTextFile(true);
  }, [fileSystem.currentText]);

  const renderFilesAndFolders = useMemo(() => {
    const valuesForRender = fileSystem.currentFolder ?? fileSystem.root;

    return valuesForRender.map((n: any) => (
      <div
        onClick={() =>
          setFileSystem((prev: any) => {
            const key = n.type === 'folder' ? 'currentPath' : 'currentText';
            const value =
              n.type === 'folder' ? [...prev.currentPath, n.name] : n.content;

            return {
              ...prev,
              [key]: value,
            };
          })
        }
      >
        {n.name}
      </div>
    ));
  }, [fileSystem.currentFolder, fileSystem.root]);

  return (
    <div className='App'>
      <p
        onClick={() => {
          setFileSystem((prev: any) => {
            return {
              ...prev,
              currentPath: prev.currentPath.splice(-1),
            };
          });
        }}
      >
        Back
      </p>
      {renderFilesAndFolders}

      {showTextFile && (
        <div>
          <p
            onClick={() => {
              setFileSystem((prev: any) => ({
                ...prev,
                currentText: null,
              }));
              setShowTextFile(false);
            }}
          >
            X
          </p>
          <p>{fileSystem.currentText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
