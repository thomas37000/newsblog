import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartJs: React.FunctionComponent = () => {
  const [prices, setPrices] = useState<{ x: number; y: number }[]>([]);

  const market_char = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(market_char);
      setPrices(
        res.data.prices.map((value: number[]) => ({
          x: value[0],
          y: value[1].toFixed(2),
        }))
      );
      console.log(res.data);
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const data = {
    labels: prices.map((value) => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        // label: id
        label: 'Bitcoin',
        data: prices.map((val) => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div>{prices.length > 0 && <Line options={options} data={data} />}</div>
  );
};

export default ChartJs;
