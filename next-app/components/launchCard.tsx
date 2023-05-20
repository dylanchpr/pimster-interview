import React from "react";
import { Launch } from "../pages";

interface LaunchCardProps {
  launch: Launch;
}

const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
  const { mission_name, launch_date_local, rocket } = launch;

  return (
    <div>
      <div className="launch-details">
        <h3>{mission_name}</h3>
        <p>Rocket: {rocket.rocket_name}</p>
        <p>Launch Date: {launch_date_local}</p>
      </div>
    </div>
  );
};

export default LaunchCard;
