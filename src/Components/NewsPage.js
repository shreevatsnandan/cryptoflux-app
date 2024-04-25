import React, { useEffect, useState, Suspense } from 'react';
import './NewPage.css';

const LazyLoadedArticles = React.lazy(() => import('./LazyLoadedArticles'));

const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="news-container">
            <div className="newshead">
                <h1>Crypto News</h1>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {!isLoading && <LazyLoadedArticles articles={articles} />}
            </Suspense>
        </div>
    );
}

export default NewsPage;
