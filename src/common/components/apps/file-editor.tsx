import { useEffect, useState } from 'react';
import { TextFile } from '../../../services/filesystem/types';

interface FileEditorProps {
  file?: TextFile;
}

export const FileEditor: React.FC<FileEditorProps> = ({ file }) => {
  // TODO it could have it own state
  const [editedFile, setEditedFile] = useState<TextFile>({
    content: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    type: 'text',
  });

  useEffect(() => {
    if (!file) return;
    setEditedFile(file);
  }, [file]);
  return <div>This is just test File Editor app</div>;
};
