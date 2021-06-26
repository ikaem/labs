import { useEffect, useState } from 'react';
import { TextFile } from '../../../services/filesystem/types';

interface FileEditorProps {
  file?: TextFile;
}

export const FileEditor: React.FC<FileEditorProps> = ({ file }) => {
  // TODO it could have it own state
  // TODO should have its own reducer, but component should be react, yes
  // TODO and file editor could get the actual file to open
  // and in the reducer, we can add another file in the active files, or something - and then set it to opened - and when closed, we just remove it from there?...
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
