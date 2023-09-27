import React, { useContext } from "react";
import LoginBanner from "../../component/LoginBanner/LoginBanner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { signIn } = useContext(AuthContext);

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success(`Authenticated as ${result.user?.email}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <LoginBanner></LoginBanner>

      {/* register form */}
      <div className="md:pt-28 md:pb-5 flex justify-center items-center">
        <form
          action=""
          className="border-1 w-[60%] p-8"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h3 className="text-2xl text-center font-bold mb-5">
            Sign In to Doc House
          </h3>

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

          <button
            type="submit"
            className="w-full h-[50px] bg-[var(--sec-color)] text-white font-bold rounded-lg"
          >
            Sign In
          </button>

          <p className="text-center mt-3">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-[var(--sec-color)]">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
