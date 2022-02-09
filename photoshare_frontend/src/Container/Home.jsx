import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")}>
          <h2 className="font-bold text-lg p-2">PhotoShare</h2>
        </button>
        <button onClick={() => navigate("profile")}></button>
      </div>
      <Outlet />
    </div>
  );
}
