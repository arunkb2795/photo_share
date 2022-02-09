import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../Client";
import { feedQuery } from "../utils/data";
import { Layout } from "../Components";
import { Create } from "../Assets";
import { v4 as uuidv4 } from "uuid";

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

  const handleDelete = (id) => {
    client.delete(id).then(() => {
      let data = [...details];
      let filteredPins = data.filter((p) => p._id !== id);
      setDetails(filteredPins);
    });
  };

  const handleLike = (id) => {
    console.log(id);
    client
      .patch(id)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [
        {
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: "postedBy",
            _ref: user?.googleId,
          },
        },
      ])
      .commit()
      .then(() => {
        window.location.reload();
      });
  };

  console.log({ details });
  return (
    <div>
      <div className="flex items-center justify-between	p-2">
        <h4 className="font-bold	"></h4>
        <button
          className="cursor-pointer"
          onClick={() => navigate("create-pin")}
        >
          <Create />
        </button>
      </div>
      <Layout
        options={details}
        handleDelete={handleDelete}
        handleLike={handleLike}
        user={user}
      />
    </div>
  );
}
