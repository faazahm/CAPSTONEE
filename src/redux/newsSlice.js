import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ambil API key dan URL dari environment variables
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export const fetchNews = createAsyncThunk("news/fetchNews", async (query) => {
  const response = await axios.get(`${API_URL}?q=${query}&api-key=${API_KEY}`);
  return response.data.response.docs.map((doc) => ({
    title: doc.headline.main,
    abstract: doc.abstract,
    url: doc.web_url,
    image: doc.multimedia.length
      ? `https://www.nytimes.com/${doc.multimedia[0].url}`
      : null, // Ambil gambar pertama jika ada
    saved: false,
  }));
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    savedArticles: [],
    loading: false,
  },
  reducers: {
    toggleSave: (state, action) => {
      const article = action.payload;
      const isSaved = state.savedArticles.some((a) => a.url === article.url);

      state.savedArticles = isSaved
        ? state.savedArticles.filter((a) => a.url !== article.url)
        : [
            ...state.savedArticles,
            { ...article, saved: true, savedAt: new Date() },
          ];

      state.articles = state.articles.map((a) =>
        a.url === article.url ? { ...a, saved: !isSaved } : a
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loading = false;
        console.error("Failed to fetch news");
      });
  },
});

export const { toggleSave } = newsSlice.actions;
export default newsSlice.reducer;
