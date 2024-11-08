import { useState, useEffect } from 'react';

function Clock() {
    const [date, setDate] = useState(new Date());

    function refreshClock() {
        setDate(new Date());
    }

    useEffect(() => {
        const timerId = setInterval(refreshClock, 30000);
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);

    return (
        <div className='clock'>
            {date.toLocaleTimeString([], {timeStyle: 'short'})}
        </div>
    );
}

export default Clock; 