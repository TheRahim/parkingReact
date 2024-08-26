import React, { useEffect, useState } from 'react';

const TimeElapsed = ({ entryTime }: { entryTime: Date  }) => {
    const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');
    useEffect(() => {        
      const updateElapsedTime = () => {

        const now = new Date();
        const entryDate = new Date(entryTime)

        const diff = Math.floor((now.getTime() - entryDate.getTime()) / 1000);
        

        const hours = Math.floor(diff / 3600) % 24;
        const minutes = Math.floor(diff / 60) % 60;
        const seconds = Math.floor(diff % 60);
  
        const formattedElapsedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        setElapsedTime(formattedElapsedTime);
      };
  
      const intervalId = setInterval(updateElapsedTime, 1000);
  
      return () => clearInterval(intervalId);
    }, [entryTime]);
  
    return <a>{elapsedTime}</a>;
  };
  
  export default TimeElapsed;
