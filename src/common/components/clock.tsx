import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useState } from 'react';
import { useErrorHandling } from './error-boundary';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date().toISOString());

  const { triggerErrorState } = useErrorHandling();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toISOString());
      // @ts-ignore
      // setTime(new Date());
      triggerErrorState({ error: 'hello', errorInfo: 'test' });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='clock'>
      {dayjs(time).format('DD MMM YYYY')},{/* {dayjs(time)}, */}
      <br className='clock_splitter' />
      {dayjs(time).format('HH:mm:ss')}
    </div>
  );
};
