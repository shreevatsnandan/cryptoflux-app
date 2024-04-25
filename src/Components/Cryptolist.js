import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Cryptolist_style.css';

export default function Cryptolist() {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&price_change_percentage=1h%2C%2024h%2C%207d%2C%2030d%2C%20%201y')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCryptoData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCryptoClick = (id) => {
    navigate(`/dashboard/${id}`); 
  };

  const filteredCryptoData = cryptoData.filter(data =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Suspense fallback={<div>please wait...</div>}>
      <div className='crypto-list'>
        <h1>Explore Crypto</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="coin-container">
          {filteredCryptoData.map((data, index) => (
            <div key={index} className="coin-card" onClick={() => handleCryptoClick(data.id)}>
              <img src={data.image} alt={data.name} />
              <h3>{data.name}</h3>
              <p>Price: Rs. {addCommas(data.current_price)}</p>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
