import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import './Dashboard_style.css';

const RangeInput = ({ value, handleChange, handleButtonClick }) => {
    return (
        <div className="container">
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
            />
            <span>{value}</span>
            <div className="buttons">
                <button onClick={() => handleButtonClick('decrement')}>-</button>
                <button onClick={() => handleButtonClick('increment')}>+</button>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [fromDate, setFromDate] = useState();
    const [coinData, setCoinData] = useState(null);
    const [rangeValue, setRangeValue] = useState(50);

    useEffect(() => {
        fetchData();
        fetchCoinData();
    }, [id, fromDate]);

    const fetchData = () => {
        const currentDate = new Date();
        const toTimestamp = Math.floor(currentDate.getTime() / 1000);

        let fromTimestamp;

        if (fromDate !== undefined) {
            const selectedDate = new Date(toTimestamp * 1000);
            selectedDate.setDate(selectedDate.getDate() - fromDate);
            fromTimestamp = Math.floor(selectedDate.getTime() / 1000);
        } else {
            const sevenDaysAgo = new Date(toTimestamp * 1000);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            fromTimestamp = Math.floor(sevenDaysAgo.getTime() / 1000);
        }

        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=inr&from=${fromTimestamp}&to=${toTimestamp}&precision=2`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                setData(result.prices);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchCoinData = () => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                setCoinData(result);
            })
            .catch(error => {
                console.error('Error fetching coin data:', error);
            });
    };

    const handleDropdownChange = (value) => {
        setFromDate(value);
    };

    const handleChange = (event) => {
        setRangeValue(parseInt(event.target.value));
    };

    const handleButtonClick = (action) => {
        if (action === 'increment') {
            setRangeValue((prevValue) => Math.min(prevValue + 10, 100));
        } else if (action === 'decrement') {
            setRangeValue((prevValue) => Math.max(prevValue - 10, 0));
        }
    };

    function addCommas(x) {
        let numStr = x.toString();
        let parts = numStr.split('.');
        let integerPart = parts[0];
        if (integerPart.length > 3) {
            let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.length > 1 ? formattedInteger + "." + parts[1] : formattedInteger;
        } else {
            return numStr;
        }
    }

    const formattedData = data.reduce((acc, curr) => {
        const currentDate = new Date(curr[0]);
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
        });
        const existingEntryIndex = acc.findIndex(item => item.name === formattedDate);

        if (existingEntryIndex === -1) {
            acc.push({
                name: formattedDate,
                price: curr[1]
            });
        }

        return acc;
    }, []);

    return (
        <Suspense fallback={<div>please wait...</div>}>
            <div className='dashboard'>
                <div className='dashboardHeader'>
                    {coinData && (
                        <div className='logo'>
                            <img src={coinData.image.large} alt={coinData.name} />
                        </div>
                    )}
                    {coinData && (
                        <div className='currentPrice'>
                            <h2>{coinData.name}</h2>
                            <p>Current Price: {addCommas(coinData.market_data.current_price.inr)} INR</p>
                        </div>
                    )}
                </div>
                <div className='graph'>
                    <div className='graph-dd'>
                        <select onChange={(e) => handleDropdownChange(parseInt(e.target.value))}>
                            <option value={7}>7 days ago</option>
                            <option value={30}>1 month ago</option>
                            <option value={365}>1 year ago</option>
                        </select>
                    </div>
                    <div className='graph-gh'>
                        <LineChart
                            width={1000}
                            height={300}
                            data={formattedData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                            style={{
                                background: '#fff',
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                axisName={{ fontSize: 22 }}
                                tick={{ fontSize: 22 }}
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' })}
                            />
                            <YAxis
                                axisName={{ fontSize: 40 }}
                                tick={{ fontSize: 40 }}
                            />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>
                <div className='market'>
                    <div className='quantity'>
                        <div className='quantityTxt'><h3>Select Quantity</h3> </div>
                        <div className='scroller'>
                            <RangeInput
                                value={rangeValue}
                                handleChange={handleChange}
                                handleButtonClick={handleButtonClick} />
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <button className="big-button">Buy</button>
                        <button className="big-button">Sell</button>
                    </div>
                </div>

            </div>
        </Suspense>
    );
};

export default Dashboard;
