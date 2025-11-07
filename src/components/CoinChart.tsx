import {CategoryScale, Legend, LinearScale, LineElement, PointElement, TimeScale, Tooltip} from "chart.js";
import { Chart as ChartJS} from "chart.js";
import {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import Spinner from "./Spinner.tsx";
const API_URL = import.meta.env.VITE_COIN_API_URL;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

function CoinChart({coinId}) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
                const res = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`)
                const data = await res.json();

                const prices = data.prices.map((price) => ({
                    x: price[0],
                    y: price[1],
                }))
                setChartData({
                    datasets: [
                        {
                            label: 'Price (USD)',
                            data: prices,
                            fill: true,
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0,123,255,0.1',
                            pointRadius: 0,
                            tension: 0}
                    ]
                });
                setLoading(false);
        }
        fetchPrices();
    }, [coinId]);
    return <div style={{marginTop: '30px'}}>
        { loading ? <Spinner /> :
        <Line data={chartData}  options={{
            responsive: true,
            plugins: {
                legend: {display: false},
            tooltip: { mode: 'index', intersect: false },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 7
                    }
                },
                y: {
                    ticks: {
                        callback: (value) => `$${value.toLocaleString()}`
                    }
                }       }
        }}/>}
    </div>
}

export default CoinChart;