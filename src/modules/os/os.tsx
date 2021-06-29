import { useEffect } from 'react';
import { Filesystem, Layout, RSSReader } from '../../common/components';
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
        <div className='os_func-wrapper'>
          <RSSReader />
        </div>
      </div>
    </Layout>
  );
};
