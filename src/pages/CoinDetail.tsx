import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
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
import CardCoinDetail from '../components/Cards/CardCoinDetail';
import ICoinGeckoDetail from '../interfaces/Coins/GeckoApi/CoinsInterfaceGeckoDetail';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinDetail: React.FunctionComponent = () => {
  const [prices, setPrices] = useState<{ x: number; y: number }[]>([]);
  const [coins, setCoins] = useState<ICoinGeckoDetail[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const market_char = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(market_char);
      setPrices(
        res.data.prices.map((value: number[]) => ({
          x: value[0],
          y: value[1].toFixed(2),
        }))
      );
      console.log('ChartJS', res.data);
    };

    fetchData();
  }, []);

  const coinDetail = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`;

  useEffect(() => {
    const loadCoin = () => {
      setLoading(true);

      axios
        .get(coinDetail)
        .then((res) => {
          setError('');
          setCoins(res.data);
          console.log('Crypto detail', res.data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadCoin();
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
        label: id,
        data: prices.map((val) => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <div className=''>
        {/* CHART JS */}
        {prices.length > 0 && <Line options={options} data={data} />}
      </div>
      {/* DESCRIPTION */}
      {/* <CardCoinDetail coin={coins} /> */}
    </>
  );
};

export default CoinDetail;
