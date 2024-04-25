import React, { useEffect, useState, Suspense } from 'react';
import './NewPage.css';

const NewsPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=crypto&apiKey=a446e53acca14725b2cff865167aac35')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setArticles(data.articles);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <div className="news-container">
            <div className="newshead">
                <h1>Crypto News</h1>
            </div>
            <Suspense fallback={<div>please wait...</div>}>
                <div className="articles-container">
                    {articles.map((article, index) => (
                        <div key={index} className="article-card">
                            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="article-image" />}
                            <div className="article-details">
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </Suspense>
        </div>
    );
}

export default NewsPage;
