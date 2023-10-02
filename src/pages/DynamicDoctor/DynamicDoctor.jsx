import React, { useEffect, useState } from "react";
import "./DynamicDoctor.css";
import { useLoaderData, useParams } from "react-router-dom";
import SharedBanner from "../Shared/SharedBanner/SharedBanner";
import DynamicHelmet from "../../component/DynamicHelmet/DynamicHelmet";
import { Card, CardBody, Chip, Image } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import { HiOutlineLocationMarker } from "react-icons/hi";
import DoctorBio from "./DoctorBio/DoctorBio";

const DynamicDoctor = () => {
  // const id = useParams().id;

  // const [doctorInfo, setDoctorInfo] = useState([]);
  // useEffect(() => {
  //   fetch("/doctors.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const selectedDoctor = data.find(
  //         (doctor) => doctor._id === parseInt(id)
  //       );
  //       setDoctorInfo(selectedDoctor);
  //     });
  // }, [id]);

  const doctorInfo = useLoaderData();

  const { name, img, designation, rating, location, specialization } =
    doctorInfo;

  return (
    <div>
      <DynamicHelmet pageName="Doctor Profile" />
      <SharedBanner
        route={`Home / Doctor / ${doctorInfo?.name}`}
        title={"Doctor Profile"}
      />

      <div className="bg-[#f3f3f3] md:min-h-[1300px]">
        {/* doctor card */}
        <div className="pt-20 mb-10">
          <Card
            className="border-none bg-background/60 dark:bg-default-100/50 md:w-3/4 mx-auto mb-20"
            shadow="md"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    alt="Album cover"
                    className="object-cover h-[280px]"
                    shadow="sm"
                    src={img}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8 ms-4">
                  <div>
                    <h1 className="text-4xl font-bold">{name}</h1>
                    <p className="text-gray-500 mt-1">{designation}</p>
                    <div className="flex items-center">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={rating}
                        readOnly
                        className="mt-3 mb-5 me-3"
                      />
                      <span>({rating})</span>
                    </div>

                    <div className="flex justify-start items-center text-lg text-gray-600 space-x-3 my-4">
                      <HiOutlineLocationMarker className="text-2xl" />
                      <p className="text-lg">{location}</p>
                    </div>

                    <div className="mt-4 space-x-4">
                      <Chip color="default" variant="bordered">
                        {specialization && specialization[0]}
                      </Chip>
                      <Chip color="default" variant="bordered">
                        {specialization && specialization[1]}
                      </Chip>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* doctor's bio */}
        <DoctorBio doctorInfo={doctorInfo} />
      </div>
    </div>
  );
};

export default DynamicDoctor;
