import { Rating } from "@smastrom/react-rating";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./MyReview.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthContext from "../../../hooks/useAuthContext";
import Swal from "sweetalert2";

const MyReview = () => {
  const [axiosInterceptor] = useAxiosSecure();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      rating: 0,
    },
  });

  const handleReview = (data) => {
    setIsLoading(true);

    const review = { ...data, img: user?.photoURL, email: user?.email };
    axiosInterceptor.post("/reviews", review).then((res) => {
      if (res.data.insertedId) {
        setIsLoading(false);
        reset();

        Swal.fire({
          title: "Marvellous!",
          text: "Thanks for giving us your feedback 💖",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleReview)}
        className="review-form bg-white shadow-md rounded-xl"
      >
        <div className="text-center mb-10">
          <h4 className="text-2xl font-bold mb-2">RATE US!</h4>
          <div className="w-fit mx-auto">
            <Controller
              control={control}
              name="rating"
              rules={{
                validate: (rating) => rating > 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Rating
                  style={{ maxWidth: 180 }}
                  value={value}
                  isRequired
                  onChange={onChange}
                  visibleLabelId="rating_label"
                  onBlur={onBlur}
                />
              )}
            />
            {errors.rating && (
              <div className="text-danger font-medium mt-2">
                Rating is required.
              </div>
            )}
          </div>
        </div>

        <div>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Your name"
            {...register("name", { required: true, maxLength: 80 })}
          />
          {errors.name && (
            <div className="text-danger font-medium">
              Your name is required.
            </div>
          )}
        </div>

        <div className="my-6">
          <label>Your Profession</label>
          <input
            type="text"
            placeholder="What do you do?"
            {...register("profession", { required: true, maxLength: 80 })}
          />
          {errors.profession && (
            <div className="text-danger font-medium">
              Profession is required.
            </div>
          )}
        </div>

        <div>
          <label>Your review</label>
          <textarea
            rows={10}
            placeholder="Tell us your experience with us"
            {...register("review", { required: true })}
          />
          {errors.review && (
            <div className="text-danger font-medium">Review is required.</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary-500 text-white font-bold w-[170px] h-[40px] rounded-sm mt-5"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyReview;
