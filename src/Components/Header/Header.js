import React from "react";
import "./Header.css";

const Header = ({ shouldDisplayBlackBackground }) => {
  return (
    <header className={shouldDisplayBlackBackground && "black"}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
        </a>
      </div>
      <div className="header--user">
        <a href="/" onClick={(e) => e.preventDefault()}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
