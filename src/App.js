import React, { Fragment, useEffect, useState } from "react";
import introGif from "../src/assets/images/intro.gif";
import loadingSpinner from "../src/assets/images/loading-spinner.gif";
import "./App.css";
import Featured from "./Components/Featured/Featured";
import Header from "./Components/Header/Header";
import MovieRow from "./Components/MovieRow/MovieRow";
import Tmdb from "./Tmdb";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [headerBlackBackground, setHeaderBlackBackground] = useState(false);

  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(false);
  const [platform, setPlatform] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      let list = await Tmdb.getHomeList();

      setMovieList(list);

      let originals = list.filter(
        (movieList) => movieList.slug === "netflix-originals"
      );
      let randomChoice = Math.floor(
        Math.random() * originals[0].items.results.length - 1
      );
      let featured = originals[0].items.results[randomChoice];

      let featuredData = await Tmdb.getMovieInfo(featured?.id, "tv");

      setFeaturedData(featuredData);
    };

    loadData();

    setTimeout(() => {
      setLoading(false);
      setIntro(true);
    }, 2000);
  }, []);

  useEffect(() => {
    intro &&
      setTimeout(() => {
        setIntro(false);
        setPlatform(true);
      }, 3900);
  }, [intro]);

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 10
        ? setHeaderBlackBackground(true)
        : setHeaderBlackBackground(false);
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      {platform && (
        <Fragment>
          <Header shouldDisplayBlackBackground={headerBlackBackground} />

          {featuredData && <Featured featuredData={featuredData} />}

          <section className="lists">
            {movieList.map((item, key) => (
              <MovieRow key={key} title={item.title} items={item.items} />
            ))}
          </section>

          <footer>
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤
            </span>{" "}
            by RodrigoBacila <br />
            Image rights to
            <a href="https://www.netflix.com/"> Netflix</a> <br />
            All data was collected from
            <a href="https://www.themoviedb.org/"> The Movie Database (TMDB)</a>
          </footer>
        </Fragment>
      )}

      {loading && (
        <div className="loading">
          <img src={loadingSpinner} alt="loading" />
        </div>
      )}

      {intro && (
        <div className="intro">
          <img src={introGif} alt="intro" />
        </div>
      )}
    </div>
  );
};

export default App;
