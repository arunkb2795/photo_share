import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")}>Logo</button>
        <button onClick={() => navigate("profile")}>User Profile</button>
      </div>
      <Outlet />
    </div>
  );
}
