import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { client } from "../Client";
export default function Login() {
  const navigate = useNavigate();
  const handleGoogleResponse = (data) => {
    localStorage.setItem("user", JSON.stringify(data.profileObj));
    const { name, googleId, imageUrl } = data.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  const handleGoogleFailure = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="shadow-2xl">
        <GoogleLogin
          clientId="1084485189932-uu6uh83aa84339q5pk1l51i3jpqss6s1.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-2"
              onClick={renderProps.onClick}
            >
              <FcGoogle className="mr-4" />
              Sign in with google
            </button>
          )}
          onSuccess={handleGoogleResponse}
          onFailure={handleGoogleFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
}
