import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { client } from "../Client";
import { feedQuery, searchQuery, categories } from "../utils/data";
import Feed from "../Components/Feed";
import CreatePin from "../Components/CreatePin";
export default function Pins(props) {
  const { user } = props;
  return (
    <div>
      <div>search component</div>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/create-pin" element={<CreatePin user={user} />} />
      </Routes>
    </div>
  );
}
