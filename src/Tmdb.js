/* eslint-disable import/no-anonymous-default-export */

const API_KEY = "1973b2e1baaef2d25f0eb19c0906dad1";
const API_BASE_URL = "https://api.themoviedb.org/3";

const MOVIE_CODE_ACTION = 28;
const MOVIE_CODE_COMEDY = 35;
const MOVIE_CODE_HORROR = 27;
const MOVIE_CODE_ROMANCE = 10749;
const MOVIE_CODE_DOCUMENTARY = 99;

const customFetch = async (endpoint) => {
  const request = await fetch(`${API_BASE_URL}${endpoint}`);
  const json = await request.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "netflix-originals",
        title: "Netflix Originals",
        items: await customFetch(
          `/discover/tv?with_network=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Trending",
        items: await customFetch(`/trending/all/week?api_key=${API_KEY}`),
      },
      {
        slug: "top-rated",
        title: "Top Rated",
        items: await customFetch(`/movie/top_rated?api_key=${API_KEY}`),
      },
      {
        slug: "action",
        title: "Action",
        items: await customFetch(
          `/discover/movie?with_genres=${MOVIE_CODE_ACTION}&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comedy",
        items: await customFetch(
          `/discover/movie?with_genres=${MOVIE_CODE_COMEDY}&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Horror",
        items: await customFetch(
          `/discover/movie?with_genres=${MOVIE_CODE_HORROR}&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await customFetch(
          `/discover/movie?with_genres=${MOVIE_CODE_ROMANCE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentary",
        items: await customFetch(
          `/discover/movie?with_genres=${MOVIE_CODE_DOCUMENTARY}&api_key=${API_KEY}`
        ),
      },
    ];
  },
  getMovieInfo: async (id, type) => {
    let info = {};

    if (id) {
      switch (type) {
        case "movie":
          info = await customFetch(`/movie/${id}?api_key=${API_KEY}`);
          break;

        case "tv":
          info = await customFetch(`/tv/${id}?api_key=${API_KEY}`);
          break;

        default:
          break;
      }
    }

    return info;
  },
};
