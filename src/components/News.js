import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        fetchNewsData();
    }, []);

    const fetchNewsData = async () => {
        props.setProgress(10); // Set loading progress to 0 before fetching data
        const { country, pageSize, category } = props;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b0052b73e72c4677bf6fe04fbe19ddf6&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        const data = await fetch(url);
        props.setProgress(30);
        const parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100); // Set loading progress to 100 after fetching data
    };

    const fetchMoreData = async () => {
        const { country, pageSize, category } = props;
        setPage((prevPage) => prevPage + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b0052b73e72c4677bf6fe04fbe19ddf6&page=${page}&pageSize=${pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <div className="container my-3">
            <h1 style={{ margin: '48px 311px', marginTop:'90px' ,width: '1056px', position: 'relative', right: '26px' }}>
                News Monkey-Top {capitalizeFirstLetter(props.category)} headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem
                                    imageUrl={element.urlToImage}
                                    title={element ? element.title.slice(0, 66) : ''}
                                    description={element.description ? element.description.slice(0, 88) + '...' : ''}
                                    newsUrl={element.url}
                                    author={!element.author ? 'unknown' : element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;