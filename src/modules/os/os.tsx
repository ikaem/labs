import { useState, useEffect, useMemo } from 'react';
import { Filesystem, Layout } from '../../common/components';
import { useFilesystem } from '../../services/filesystem';

export const OS: React.FC = () => {
  const { loadStoredFilesystem, useStoredFilesystem } = useFilesystem();
  const [storedFilesystem] = useStoredFilesystem();

  useEffect(() => {
    if (storedFilesystem) loadStoredFilesystem(storedFilesystem);
  }, []);
  return (
    <Layout>
      <div className='os'>
        <div className='os_func-wrapper'>
          <Filesystem />
        </div>
        <div className='os_func-wrapper'>Hello</div>
      </div>
    </Layout>
  );
};
