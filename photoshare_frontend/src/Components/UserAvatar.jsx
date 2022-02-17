import React from "react";

export function UserAvatar() {
  return (
    <div>
      <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center">
        U
      </div>
    </div>
  );
}

export function AvatarWithDetails(props) {
  const { name, image, textColor = "text-black" } = props;
  return (
    <span className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
        <img className="w-8 h-8 rounded-full" src={image} alt="user-image" />
      </div>
      <h4 className={`${textColor} p-2 text-base`}>{name}</h4>
    </span>
  );
}
