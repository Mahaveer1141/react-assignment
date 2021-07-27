import React from "react";
import { Redirect } from "react-router-dom";

const Home: React.FC = () => {
  const username = String(localStorage.getItem("username") || "");
  return <Redirect to={username === "" ? "/login" : "/profile"} />;
};

export default Home;
