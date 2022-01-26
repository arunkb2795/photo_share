import React from "react";
import { useParams } from "react-router-dom";
export default function Details() {
  const params = useParams();
  const pinId = params.pinId;
  return <div>Pin Details{pinId}</div>;
}
