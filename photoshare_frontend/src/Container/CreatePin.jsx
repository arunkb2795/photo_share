import React, { useState, useEffect } from "react";
import { client } from "../Client";
import { categories } from "../utils/data";
export default function CreatePin(props) {
  const { user } = props;

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
    });
  };

  return (
    <div>
      create pin
      <div>
        <div>
          <img src={imageAsset?.url} alt="uploaded-image" />
        </div>
        <input type="file" name="upload-image" onChange={handleUpload} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="About"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="other">Select Category</option>
          {categories?.map((c) => {
            return <option value={c.name}>{c.name}</option>;
          })}
        </select>
        <button type="button" onClick={handleSave}>
          Save Pin
        </button>
      </div>
    </div>
  );
}
