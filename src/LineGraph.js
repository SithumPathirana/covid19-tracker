import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import axios from './axios';

function LineGraph() {
    const [data, setData] = useState({});

    useEffect(() => { 
        async function fetchData() { 
            const response = await axios.get('/historical/all?lastdays=120');
            console.log(response);
        }

        fetchData();
    },[]);

  return (
      <div className='line-graph'>
          {/* <Line data={ null} options={null } /> */}
    </div>
  )
}

export default LineGraph