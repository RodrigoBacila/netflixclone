import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React, { useState } from "react";
import "./MovieRow.css";

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let scrollValue = scrollX + Math.round(window.innerWidth / 2);

    if (scrollValue > 0) {
      scrollValue = 0;
    }

    setScrollX(scrollValue);
  };

  const handleRightArrow = () => {
    let scrollValue = scrollX - Math.round(window.innerWidth / 2);
    let listMaxWidth = items.results.length * 150;

    if (window.innerWidth - listMaxWidth > scrollValue) {
      scrollValue = window.innerWidth - listMaxWidth - 60;
    }

    setScrollX(scrollValue);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div className="movieRow--item" key={key}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
