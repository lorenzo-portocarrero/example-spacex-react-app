import React from "react";

import StarFilled from "../star-filled.svg";
import StarOutlined from "../star-outlined.svg";

const LaunchCard = ({
  imageSrc,
  index,
  mission_name,
  details,
  launch_date,
  isFavorite,
  setFavorite,
  favorites,
  setFavorites,
}) => {
  return (
    <div className="launch-card">
      <div
        className="launch-card-image-container"
        style={{
          backgroundImage: `url(${"https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"})`,
        }}
      ></div>
      <div className="launch-card-detail">
        <div style={{ fontWeight: 600, marginBottom: "4px" }}>
          {mission_name.toUpperCase()}
        </div>
        <div style={{ marginBottom: "12px" }}>{details}</div>
        <div style={{ color: "#aaa" }}>{launch_date}</div>
      </div>
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "30px",
          cursor: "pointer",
        }}
      >
        <img
          alt=""
          src={isFavorite ? StarFilled : StarOutlined}
          width={26}
          onClick={() => {
            setFavorite(index, !isFavorite, favorites, setFavorites);
          }}
        ></img>
      </div>
    </div>
  );
};

export default LaunchCard;
