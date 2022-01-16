import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { SideBar, UserProfile } from "../Components";
import Pins from "./Pins";
import { client, clients } from "../Client";
import { userQuery } from "../utils/data";
export default function Home() {
  const [user, setUser] = useState(null);
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div>
      <div className="flex bg-gray-50 md:flex-column flex-col h-screen">
        <div className="flex flex-row justify-between">
          <SideBar />
          {user ? (
            <img src={user?.image} alt="user-pic" width="100px" />
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
