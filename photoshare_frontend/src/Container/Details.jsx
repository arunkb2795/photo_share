import React, { useState, useEffect } from "react";
import { client } from "../Client";
import { pinDetailQuery, pinDetailMorePinQuery } from "../utils/data";
import { useParams, useNavigate } from "react-router-dom";
import { AvatarWithDetails, Spinner } from "../Components";
import { ArrowLeft } from "../Assets";

export default function Details() {
  const params = useParams();
  const pinId = params.pinId;
  const navigate = useNavigate();
  const [pinDetails, setPinDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchPinDetails = () => {
    setLoading(true);
    const query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetails(data[0]);
        setLoading(false);
      });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, []);

  if (loading) {
    return (
      <div className="h-90vh flex  justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <span className="flex items-center p-2">
        <div onClick={() => navigate("/")}>
          <ArrowLeft />
        </div>
        <h2 className="font-bold px-2 ">Back</h2>
      </span>
      <div className="p-2 rounded-sm">
        <img
          src={pinDetails?.image?.asset.url}
          alt="pin-details"
          className="w-full h-auto"
        />
        <div className="flex items-center justify-between">
          <AvatarWithDetails
            name={pinDetails?.postedBy?.userName}
            image={pinDetails?.postedBy?.image}
          />
          <span>{pinDetails?.save?.length} Likes</span>
        </div>

        <h3>{pinDetails?.title}</h3>
        <span>{pinDetails?.about}</span>
      </div>
    </div>
  );
}
