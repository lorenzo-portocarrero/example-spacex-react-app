import React, { useEffect, useRef, useState } from "react";
import LaunchCard from "../components/LaunchCard";
import TabBar from "../components/TabBar";

import moment from "moment";

const getLaunches = async () => {
  const rocketsMap = {};

  const response = await fetch("https://api.spacexdata.com/v3/rockets");
  const rocketsArray = await response.json();

  for (const rocket of rocketsArray) {
    rocketsMap[`${rocket.rocket_id}`] = rocket;
  }

  const response2 = await fetch("https://api.spacexdata.com/v3/launches");
  const launchesArray = await response2.json();

  return launchesArray.map((launch) => {
    const launchDate = moment.unix(parseInt(launch.launch_date_unix));
    launch.launch_date_formatted = launchDate.format("MMMM DD, YYYY");

    if (rocketsMap[launch.rocket.rocket_id]) {
      launch.rocket = Object.assign(
        launch.rocket,
        rocketsMap[launch.rocket.rocket_id]
      );
    }

    return launch;
  });
};

const setFavorite = (index, value, favorites, setFavorites) => {
  const newObj = { ...favorites, [index]: value };

  setFavorites(newObj);

  localStorage.setItem("favorites", JSON.stringify(newObj));
};

const Launches = () => {
  const tabs = [{ name: "ALL" }, { name: "FAVORITES" }];

  const mounted = useRef(false);
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    mounted.current = true;

    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    mounted.current = true;

    getLaunches().then((launchesArray) => {
      if (mounted.current) {
        setLaunches(launchesArray);
        setLoading(false);
      }
    });

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div className="launches-screen">
      <h1>Launches</h1>
      <TabBar tabs={tabs}></TabBar>
      <div className="launches-container">
        {launches.map((launch, index) => {
          return (
            <LaunchCard
              key={index}
              index={index}
              imageSrc={launch.imageSrc}
              mission_name={launch.mission_name}
              details={launch.details}
              launch_date={launch.launch_date_formatted}
              isFavorite={favorites[index] === true}
              setFavorite={setFavorite}
              favorites={favorites}
              setFavorites={setFavorites}
            ></LaunchCard>
          );
        })}
      </div>
    </div>
  );
};

export default Launches;
