import React, { useContext, useState } from "react";
import "./Register.css";
import LoginBanner from "../../component/LoginBanner/LoginBanner";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import DynamicHelmet from "../../component/DynamicHelmet/DynamicHelmet";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import axios from "axios";

const imgUploadToken = import.meta.env.VITE_image_upload_token;

const Register = () => {
  const { signUp, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const handleRegister = (data) => {
    setLoading(true);

    // uploading image to imgbb and converting to link
    const imgUploadURL = `https://api.imgbb.com/1/upload?key=${imgUploadToken}`;

    const formData = new FormData();
    formData.append("image", data.photo[0]);

    fetch(imgUploadURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgHostingResponse) => {
        // sign up if img upload is successful
        if (imgHostingResponse.success) {
          const photoUrl = imgHostingResponse.data.display_url;
          data["photo"] = photoUrl;

          signUp(data.email, data.password)
            .then((result) => {
              console.log(result.user);

              if (result.user?.uid) {
                updateUserProfile(data.name, data.photo)
                  .then(() => {
                    // set user data to db
                    axios
                      .post("http://localhost:5000/users", {
                        name: data.name,
                        email: data.email,
                      })
                      .then((res) => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                          toast.success(
                            `Authenticated as ${result.user?.email}`
                          );

                          navigate("/");
                        }
                      });
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => {
              toast.error(`Sign Up Failed: ${err.code}`);
            });
          setLoading(false);
        }
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <DynamicHelmet pageName="Register" />

      <LoginBanner></LoginBanner>

      {/* register form */}
      <div className="md:pt-28 md:pb-5 flex justify-center items-center">
        <form
          className="border-1 w-[60%] p-8"
          onSubmit={handleSubmit(handleRegister)}
        >
          <h3 className="text-2xl text-center font-bold mb-5">
            Sign Up to Doc House
          </h3>

          <div className="mb-4">
            <label className="font-bold block mb-2">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-[#f3f3f3] outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="font-bold block mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-[#f3f3f3] outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="font-bold block mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-[#f3f3f3] outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="font-bold block mb-2">Photo</label>
            <input
              type="file"
              {...register("photo")}
              className="w-full p-3 rounded-lg bg-[#f3f3f3] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-[50px] bg-[var(--sec-color)] text-white font-bold rounded-lg"
            disabled={loading}
          >
            {!loading ? (
              "Create Account"
            ) : (
              <Spinner
                size="md"
                color="warning"
                labelColor="warning"
                className="inline-block mx-auto mt-2"
              />
            )}
          </button>

          <p className="text-center mt-3">
            Already registered?{" "}
            <Link to="/login" className="text-[var(--sec-color)]">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
