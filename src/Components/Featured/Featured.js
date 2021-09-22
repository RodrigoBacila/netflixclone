import React from "react";
import "./Featured.css";

const truncateText = (text) =>
  text.length > 200 ? `${text.substring(0, 200)}...` : text;

const Featured = ({ featuredData }) => {
  let firstAirDate = new Date(featuredData.first_air_date);
  let genres = [];

  for (let i in featuredData.genres) {
    genres.push(featuredData.genres[i].name);
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{featuredData.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">
              {featuredData.vote_average} points
            </div>
            <div className="featured--year">{firstAirDate.getFullYear()}</div>
            {featuredData.number_of_seasons > 0 && (
              <div className="featured--seasons">
                {featuredData.number_of_seasons} season
                {featuredData.number_of_seasons !== 1 && "s"}
              </div>
            )}
            <div className="featured--description">
              {truncateText(featuredData.overview)}
            </div>
            <div className="featured--buttons">
              <a
                className="featured--watchbutton"
                href={`/watch/${featuredData.id}`}
              >
                ► Watch
              </a>
              <a
                className="featured--mylistbutton"
                href={`/list/add/${featuredData.id}`}
              >
                + My List
              </a>
            </div>
            <div className="featured--genres">
              <strong>Genders: </strong>
              {genres.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
