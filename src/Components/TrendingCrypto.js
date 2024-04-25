import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TrendingCrypto_style.css';

export default function TrendingCrypto() {
  
  function twoDecimal(percent) {
    let numStr = percent.toString();
    let parts = numStr.split('.');
    let decimalPart = (parts[1] || '00').slice(0, 2);
    return parts[0] + '.' + decimalPart;
  }

  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTrendingData(data.coins);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className='trend-crypto'>
      <h2>Trending Cryptocurrencies🔥</h2>
      <Slider dots={false} arrows={false} infinite={true} speed={1000} slidesToShow={3} slidesToScroll={2} autoplay={true} autoplaySpeed={3000}>
        {trendingData.map((coin, index) => {
          const percentageChange = coin.item.data.price_change_percentage_24h.inr;
          const textStyle = {
            color: percentageChange > 0 ? 'green' : 'red',
          };

          return (
            <div className="carousel-card" key={index}>
              <img src={coin.item.large} alt={coin.item.name} />
              <h3>{coin.item.name}</h3>
              <p style={textStyle}>{twoDecimal(percentageChange)}%</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
