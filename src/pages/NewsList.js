import React from "react";

const NewsList = ({ articles, onSaveToggle }) => {
  return (
    <div className="news-list">
      {articles.map((article) => (
        <div key={article.url} className="news-item">
          <h3>{article.title}</h3>
          <p>{article.abstract}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            News Page
          </a>
          <button onClick={() => onSaveToggle(article)}>
            {article.saved ? "Un-Save" : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
