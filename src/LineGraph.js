import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from './axios';
import { Chart, registerables } from 'chart.js';
import numeral from 'numeral';
import './LineGraph.css';
Chart.register(...registerables);

function LineGraph({ type = 'cases' }) {
  const [data, setData] = useState({});

  const buildChartData = (data, caseType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[caseType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[caseType][date];
    }
    return chartData;
  };

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        lablel: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format('+0,0');
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            format: 'MM/DD/YY',
            tooltipFormat: 'll',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format('0a');
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/historical/all?lastdays=120');
      const chartData = buildChartData(response.data, type);
      setData(chartData);
    }

    fetchData();
  }, [type]);

  return (
    <div className="line-graph">
      <Line
        type="line"
        data={{
          datasets: [
            {
              label: 'No.of Cases',
              borderColor: '#CC1034',
              backgroundColor: 'rgba(204,16,52,0.5)',
              data: data,
            },
          ],
        }}
        options={options}
      >
        {' '}
      </Line>
    </div>
  );
}

export default LineGraph;
