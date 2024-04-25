import React from 'react';

const LazyLoadedArticles = ({ articles }) => (
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
);

export default LazyLoadedArticles;
