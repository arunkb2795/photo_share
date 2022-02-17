import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./utils/auth";
import {
  Login,
  Home,
  Feed,
  CreatePin,
  Profile,
  Search,
  Details,
} from "./Container";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Home user={Auth()} />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Feed user={Auth()} />
            </PrivateRoute>
          }
        />
        <Route
          path="create-pin"
          element={
            <PrivateRoute>
              <CreatePin user={Auth()} />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="details/:pinId"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

function PrivateRoute({ children }) {
  const auth = Auth();
  return auth ? children : <Navigate to="/login" />;
}
