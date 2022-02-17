import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
export default function Home(props) {
  const { user } = props;
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      window.location.reload();
    }
  }, [user]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="flex items-center justify-between w-full">
          <button onClick={() => navigate("/")}>
            <h2 className="font-bold text-lg p-2">PhotoShare</h2>
          </button>
          <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center mr-2">
            <img
              className="w-8 h-8 rounded-full"
              src={user?.imageUrl}
              alt="user-image"
            />
          </div>
        </div>
        <button onClick={() => navigate("profile")}></button>
      </div>
      <Outlet />
    </div>
  );
}
