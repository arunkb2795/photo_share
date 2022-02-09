import React, { useState } from "react";
import { AvatarWithDetails } from "./UserAvatar";
import { Like, LikeActive } from "../Assets";
import Masonry from "react-masonry-css";
const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

export default function Layout(props) {
  const { options, user, handleDelete, handleLike } = props;
  const [like, setLike] = useState(null);
  console.log({ options, user });
  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={breakpointColumnsObj}
    >
      {options?.map((item) => {
        return (
          <div key={item._id}>
            <div className="relative m-2 ">
              <div
                className="absolute bottom-0 p-3 flex w-full rounded-md"
                style={{
                  background:
                    "transparent linear-gradient(180deg,transparent,#000) 0 0 no-repeat padding-box",
                }}
              >
                <AvatarWithDetails
                  name={item.postedBy.userName}
                  image={item.postedBy.image}
                />
                <button
                  className="ml-auto"
                  onClick={() => handleDelete(item._id)}
                >
                  {/* Delete */}
                </button>
                <button onClick={() => handleLike(item._id)}>
                  {item.save?.filter((i) => i.postedBy._id === user?.googleId)
                    .length > 0 ? (
                    <LikeActive />
                  ) : (
                    <Like />
                  )}
                </button>
              </div>
              <img
                src={item.image?.asset.url}
                alt={item._id}
                className="rounded-md"
              />
            </div>
          </div>
        );
      })}
    </Masonry>
  );
}
