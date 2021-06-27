import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useState } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='clock'>
      {dayjs(time).format('DD MMM YYYY')}, <br className='clock_splitter' />
      {dayjs(time).format('HH:mm:ss')}
    </div>
  );
};
