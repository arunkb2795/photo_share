import React, { useState, useEffect } from "react";
import { Upload, ArrowLeft } from "../Assets";
import { client } from "../Client";
import { useNavigate } from "react-router-dom";
import { categories } from "../utils/data";
export default function CreatePin(props) {
  const { user } = props;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);

  const handleUpload = (e) => {
    const { name, type } = e.target.files[0];
    client.assets
      .upload("image", e.target.files[0], {
        contentType: type,
        filename: name,
      })
      .then((document) => {
        setImageAsset(document);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSave = () => {
    const doc = {
      _type: "pin",
      title,
      about,
      destination,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user.googleId,
      postedBy: {
        _type: "postedBy",
        _ref: user.googleId,
      },
      category,
    };
    client.create(doc).then(() => {
      console.log("success");
      navigate("/");
    });
  };

  const renderImage = () => {
    return imageAsset?.url ? (
      <img
        className="h-250 object-contain"
        src={imageAsset?.url}
        alt="uploaded-image"
        height="200px"
        width="200px"
      />
    ) : (
      <Upload />
    );
  };

  return (
    <div className="m-2">
      <span className="flex items-center pb-3">
        <div onClick={() => navigate("/")}>
          <ArrowLeft />
        </div>
        <h2 className="font-bold px-2 ">New Post</h2>
      </span>
      <div>
        <div className="h-340 border rounded-sm flex flex-col justify-center items-center">
          <div>{renderImage()}</div>
          <label for="file-upload" className="p-1 cursor-pointer">
            Upload your photos
          </label>
          <h4 className="text-sm p-1">
            Only JPEG,PNG and JPG files with maximum of 15MB.
          </h4>
          <input
            type="file"
            id="file-upload"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
        <div className="flex flex-col justify-center py-2 ">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-42 rounded-sm border-solid border-2 my-2 p-2"
          />
          <input
            type="text"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="h-42 rounded-sm border-solid border-2 my-2 p-2"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="h-42 rounded-sm border-solid border-2 my-2 p-2"
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="h-42 rounded-sm border-solid border-2 my-2 p-2"
          >
            <option value="other">Select Category</option>
            {categories?.map((c) => {
              return <option value={c.name}>{c.name}</option>;
            })}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="w-full h-42 bg-mainColor text-primary rounded-sm cursor-pointer"
        >
          Post Feed
        </button>
      </div>
    </div>
  );
}
