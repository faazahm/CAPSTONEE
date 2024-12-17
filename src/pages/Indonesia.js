import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNews, toggleSave } from "../redux/newsSlice";

const Indonesia = () => {
  const dispatch = useDispatch();
  const { articles, savedArticles, loading } = useSelector(
    (state) => state.news
  );
  const { searchTerm } = useParams();

  useEffect(() => {
    const query = searchTerm || "Indonesia";
    dispatch(fetchNews(query));
  }, [dispatch, searchTerm]);

  if (loading) {
    return <p>Loading news...</p>;
  }

  return (
    <div className="news-container">
      <h1 className="page-title">
        {searchTerm ? `${searchTerm} News` : "Indonesia News"}
      </h1>
      {articles.map((article) => (
        <div className="news-card" key={article.url}>
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="news-image"
            />
          ) : (
            <div className="news-placeholder">
              <p>No Image Available</p>
            </div>
          )}
          <div className="news-content">
            <h3 className="news-title">{article.title}</h3>
            <p className="news-abstract">{article.abstract}</p>
            <div className="news-actions">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read more
              </a>
              <br />
              <button
                onClick={() => dispatch(toggleSave(article))}
                className="save-button"
              >
                {savedArticles.some((saved) => saved.url === article.url)
                  ? "Unsaved"
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Indonesia;
