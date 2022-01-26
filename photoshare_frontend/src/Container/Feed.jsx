import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../Client";
import { feedQuery } from "../utils/data";
import { Layout } from "../Components";

export default function Feed(props) {
  const navigate = useNavigate();
  const { user } = props;
  const [details, setDetails] = useState(null);

  const fetchDetails = () => {
    client.fetch(feedQuery).then((data) => {
      setDetails(data);
    });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div>Common Feed Components</div>
      <Layout options={details} />
      <button onClick={() => navigate("create-pin")}>Create Pin</button>
    </div>
  );
}
