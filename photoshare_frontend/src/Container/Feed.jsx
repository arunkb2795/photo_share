import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../Client";
import { feedQuery, searchQuery, categories } from "../utils/data";
import { Layout, Spinner } from "../Components";
import { Create } from "../Assets";
import { v4 as uuidv4 } from "uuid";

export default function Feed(props) {
  const navigate = useNavigate();
  const { user } = props;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chipValue, setChipValue] = useState(null);

  const fetchDetails = () => {
    setLoading(true);
    client.fetch(feedQuery).then((data) => {
      setDetails(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (chipValue) {
      const query = searchQuery(chipValue);
      setLoading(true);

      client.fetch(query).then((data) => {
        setDetails(data);
        setLoading(false);
      });
      console.log("chip");
    } else {
      fetchDetails();
    }
  }, [chipValue]);

  const handlePinClick = (id) => {
    console.log(id);
    navigate(`details/${id}`);
  };

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

  const handleChip = (name) => {
    setChipValue(name);
  };

  console.log({ details });

  if (loading) {
    return (
      <div className="h-90vh flex  justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between	p-2">
        <div className="flex overflow-scroll mr-1 md:overflow-auto	">
          {categories.map((item) => {
            return (
              <button
                className="bg-shade-pink text-real-pink rounded-4 h-32 p-1 m-1 min-w-20"
                onClick={() => handleChip(item.name)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <button
          className="cursor-pointer"
          onClick={() => navigate("create-pin")}
        >
          <Create />
        </button>
      </div>
      <Layout
        options={details}
        handlePinClick={handlePinClick}
        handleDelete={handleDelete}
        handleLike={handleLike}
        user={user}
      />
    </div>
  );
}
