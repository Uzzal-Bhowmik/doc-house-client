import React from "react";
import "./AddDoctor.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import upload from "../../../assets/upload.png";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imgUploadToken = import.meta.env.VITE_image_upload_token;

const AddDoctor = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      education: [{ university: "", degree: "", years: "" }],
      experience: [{ job: "", years: "" }],
    },
  });
  const [axiosInterceptor] = useAxiosSecure();

  const { fields, append } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: experienceFields, append: appendExperience } = useFieldArray({
    control,
    name: "experience",
  });

  const handleAddDoctor = (data) => {
    const imgUploadURL = `https://api.imgbb.com/1/upload?key=${imgUploadToken}`;

    const formData = new FormData();
    formData.append("image", data.img[0]);

    const services = data.services.split(",");
    const specialization = data.specialization.split(",");

    data["services"] = services;
    data["specialization"] = specialization;

    fetch(imgUploadURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgUploadResponse) => {
        if (imgUploadResponse.success) {
          const imgLink = imgUploadResponse.data.display_url;
          data["img"] = imgLink;

          axiosInterceptor.post("/doctors", data).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your appointment has been cancelled successfully",
                showConfirmButton: false,
                timer: 2500,
              });
              reset();
            }
          });
        }
      });
  };
  return (
    <div>
      <h1 className="mb-7 text-4xl font-bold pl-2 text-center">
        Add a New Doctor
      </h1>
      <form
        onSubmit={handleSubmit(handleAddDoctor)}
        className="review-form add-doctor-form bg-white shadow-md rounded-xl space-y-5"
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Doctor's name"
            {...register("name", { required: true, maxLength: 80 })}
          />
          {errors.name && (
            <div className="text-danger font-medium">
              Doctor's name is required.
            </div>
          )}
        </div>

        <div>
          <label>Designation</label>
          <input
            type="text"
            placeholder="Designation (e.g. Cardiologist)"
            {...register("designation", { required: true, maxLength: 80 })}
          />
          {errors.designation && (
            <div className="text-danger font-medium">
              Designation is required.
            </div>
          )}
        </div>
        <div>
          <label>About</label>
          <input
            type="text"
            {...register("about", { required: true, maxLength: 80 })}
          />
          {errors.about && (
            <div className="text-danger font-medium">about is required.</div>
          )}
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            {...register("location", { required: true, maxLength: 80 })}
          />
          {errors.location && (
            <div className="text-danger font-medium">Location is required.</div>
          )}
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            {...register("price", { required: true, maxLength: 80 })}
          />
          {errors.price && (
            <div className="text-danger font-medium">price is required.</div>
          )}
        </div>

        <div>
          <label>Rating</label>
          <input
            type="number"
            {...register("rating", { required: true, maxLength: 5 })}
          />
          {errors.rating && (
            <div className="text-danger font-medium">
              rating is required and can not be greater than 5.
            </div>
          )}
        </div>

        <div>
          <label>Available Date</label>
          <input
            type="text"
            {...register("availableDate", { required: true, maxLength: 80 })}
          />
          {errors.date && (
            <div className="text-danger font-medium">date is required.</div>
          )}
        </div>

        <div>
          <label>Education</label>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-4"
            >
              <div className="w-full">
                <input
                  placeholder="university name"
                  {...register(`education.${index}.university`)}
                  required
                />
              </div>
              <div className="w-full">
                <input
                  placeholder="degree name"
                  {...register(`education.${index}.degree`)}
                  required
                />
              </div>
              <div className="w-full">
                <input
                  placeholder="years"
                  {...register(`education.${index}.years`)}
                  required
                />
                {errors.services && (
                  <div className="text-danger font-medium">
                    services is required.
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ university: "", degree: "", years: "" })}
            className="bg-primary px-4 py-2 mt-2 text-white"
          >
            Add More
          </button>
        </div>

        <div>
          <label>Experience</label>
          {experienceFields.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-4"
            >
              <div className="w-full">
                <input
                  placeholder="job"
                  {...register(`experience.${index}.job`)}
                  required
                />
              </div>
              <div className="w-full">
                <input
                  placeholder="years"
                  {...register(`experience.${index}.years`)}
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendExperience({ job: "", years: "" })}
            className="bg-primary px-4 py-2 mt-2 text-white"
          >
            Add More
          </button>
        </div>

        <div>
          <label>Services</label>
          <textarea
            rows={8}
            placeholder="Separate Services with Comma(,)"
            {...register("services", { required: true })}
            required
          />
        </div>
        <div>
          <label>Specialization</label>
          <textarea
            rows={8}
            placeholder="Separate Specializations with Comma(,)"
            {...register("specialization", {
              required: true,
            })}
            required
          />
        </div>

        <div className="border-2 border-dashed rounded-3xl">
          <label
            htmlFor="doc-photo"
            className="block w-fit mx-auto mb-3 cursor-pointer pt-5"
          >
            <img src={upload} alt="" />
          </label>
          <input
            type="file"
            id="doc-photo"
            {...register("img", { required: true })}
            className="pt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="px-16 py-3 bg-success-500 font-bold rounded-xl text-white mt-10"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
