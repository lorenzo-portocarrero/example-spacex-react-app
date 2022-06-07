import React from "react";

const TabBar = ({ tabs }) => {
  return (
    <div>
      {tabs.map((tab) => {
        return <div>{tab.name}</div>;
      })}
    </div>
  );
};

export default TabBar;
