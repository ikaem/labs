import { useState, useEffect, useMemo } from 'react';
import { Filesystem, Layout } from '../../common/components';

export const OS = () => {
  const [showTextFile, setShowTextFile] = useState(false);
  const [fileSystem, setFileSystem] = useState<any>({
    // currentPath: ['documents', 'my other folder'],
    currentText: null,
    currentFolder: [],
    currentPath: [],
    root: {
      type: 'folder',
      name: 'my filesystem',
      createdAt: '2022-06-22',
      updatedAt: '2022-06-22',
      content: [
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
    },
  });

  useEffect(() => {});

  const onClickItem = () => {};

  const getCurrentFolder = (rootContent: any) => {
    // let folder = fileSystem.root.content;
    let folder = rootContent;
    for (const path of fileSystem.currentPath) {
      const i = folder.findIndex((e: any) => e.name === path);
      folder = folder[i].content;
    }

    console.log('what is this', folder);

    return folder;
  };

  const addFile = (name: string, content: string) => {
    if (
      fileSystem.currentFolder.some((e: any) => {
        return e.type === 'text' && e.name === name;
      })
    ) {
      console.log('not allowed to have same name of the file');
      return;
    }

    const newFile = {
      type: 'text',
      name,
      createdAt: '2022-06-22',
      updatedAt: '2022-06-22',
      content,
    };

    const parent = { ...fileSystem.root };
    const folder = getCurrentFolder(parent.content);

    folder.push(newFile);

    setFileSystem((prev: any) => {
      return {
        ...prev,
        root: parent,
      };
    });
  };

  //   TODO this can be one funciton with add file
  const addFolder = (name: string) => {
    if (fileSystem.currentFolder.some((e: any) => e.name === name)) {
      console.log('not allowed to have same name of the folder');
      return;
    }

    const newFolder = {
      type: 'folder',
      name,
      createdAt: '2022-06-22',
      updatedAt: '2022-06-22',
      content: [],
    };

    const parent = { ...fileSystem.root };
    const folder = getCurrentFolder(parent.content);

    folder.push(newFolder);

    setFileSystem((prev: any) => {
      return {
        ...prev,
        root: parent,
      };
    });
  };

  useEffect(() => {
    setFileSystem((prev: any) => {
      return {
        ...prev,
        currentFolder: getCurrentFolder(prev.root.content),
      };
    });
  }, [fileSystem.currentPath, fileSystem.root]);

  useEffect(() => {
    if (!fileSystem.currentText) return;
    console.log('file system text', fileSystem);
    setShowTextFile(true);
  }, [fileSystem.currentText]);

  const renderFilesAndFolders = useMemo(() => {
    const valuesForRender = fileSystem.currentFolder;

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

  console.log('filesystem close to return', fileSystem);

  return (
    <Layout>
      <div className='os'>
        <div className='os-wrapper section1'>Hello</div>
        <div className='os-wrapper section2'>
          <Filesystem />
        </div>
      </div>
      {/* <ul>
        {fileSystem.currentPath.map((e: any, index: number) => {
          return (
            <li
              onClick={() => {
                console.log('index', index);
                const newCurrentPath = fileSystem.currentPath.slice(
                  0,
                  index + 1
                );
                setFileSystem((prev: any) => {
                  return {
                    ...prev,
                    currentPath: newCurrentPath,
                  };
                });
              }}
            >
              {e}
            </li>
          );
        })}
      </ul>
      <p
        onClick={() => {
          setFileSystem((prev: any) => {
            // const newCurrentPath = prev.currentPath.splice(-1);
            const newCurrentPath = prev.currentPath.slice(
              0,
              prev.currentPath.length - 1
            );
            return {
              ...prev,
              currentPath: newCurrentPath,
            };
          });
        }}
      >
        Back
      </p>

      <p onClick={() => addFolder('documents')}>Add folder</p>
      <p
        onClick={() =>
          addFile('my new file', 'this is just some random content')
        }
      >
        Add file
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
      )} */}
    </Layout>
  );
};
