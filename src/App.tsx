import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [fileSystem, setFileSystem] = useState<any>({
    // currentPath: ['documents', 'my other folder'],
    currentFolder: null,
    currentPath: [],
    previousPath: '',
    root: [
      {
        type: 'folder',
        name: 'documents',
        createdAt: '2022-06-22',
        updatedAt: '2022-06-22',
        children: [
          {
            type: 'folder',
            name: 'my other folder',
            createdAt: '2022-06-22',
            updatedAt: '2022-06-22',
            children: [],
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
        name: 'videos',
        createdAt: '2022-06-22',
        updatedAt: '2022-06-22',
        children: [
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
        children: [],
      },
    ],
  });

  const getCurrentFolder = () => {
    let folder = fileSystem.root;
    for (const path of fileSystem.currentPath) {
      const i = folder.findIndex((e: any) => e.name === path);
      folder = folder[i].children;
    }

    return folder;
  };

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

  const renderFilesAndFolders = useMemo(() => {
    const valuesForRender = fileSystem.currentFolder ?? fileSystem.root;

    return valuesForRender.map((n: any) => (
      <div
        onClick={() =>
          setFileSystem((prev: any) => {
            return {
              ...prev,
              currentPath: [...prev.currentPath, n.name],
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
    </div>
  );
}

export default App;
