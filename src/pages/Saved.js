import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSave } from "../redux/newsSlice";

const Saved = () => {
  const dispatch = useDispatch();
  const { savedArticles } = useSelector((state) => state.news);

  return (
    <div style={{ padding: "20px" }}>
      {savedArticles.length === 0 ? (
        <p>No saved articles. Start saving articles to view them here!</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th style={tableHeaderStyle}>Source</th>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {savedArticles.map((article) => (
              <tr key={article.url} style={rowStyle}>
                <td style={cellStyle}>
                  <div>
                    <strong>{article.source}</strong>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1e90ff", textDecoration: "none" }}
                  >
                    News Page
                  </a>
                </td>

                <td style={cellStyle}>{article.title}</td>

                <td style={cellStyle}>{article.abstract}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
  backgroundColor: "#e0e0e0",
};

const rowStyle = {
  borderBottom: "1px solid #ddd",
};

const cellStyle = {
  padding: "10px",
  verticalAlign: "top",
};

export default Saved;
