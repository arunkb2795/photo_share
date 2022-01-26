import React from "react";
import Masonry from "react-masonry-css";
import { client } from "../Client";
const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

export default function Layout(props) {
  const { options } = props;
  console.log({ options });
  const handleDelete = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={breakpointColumnsObj}
    >
      {options?.map((item) => {
        return (
          <div key={item._id}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, padding: 10 }}>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
              <img src={item.image?.asset.url} alt={item._id} />
            </div>
          </div>
        );
      })}
    </Masonry>
  );
}
