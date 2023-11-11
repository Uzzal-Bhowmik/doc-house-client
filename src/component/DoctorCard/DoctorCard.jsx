import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { AiOutlineDollar, AiTwotoneCalendar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const {
    _id,
    name,
    img,
    price,
    rating,
    designation,
    location,
    availableDate,
  } = doctor;

  return (
    <Card className="p-3">
      <CardHeader className="flex-col items-center w-full bg-[#f9f9f9] rounded-xl">
        <Image className="object-cover rounded-xl h-[250px]" src={img} />
      </CardHeader>
      <CardBody className="overflow-visible pt-4 pb-2">
        <h4 className="font-bold text-xl">{name}</h4>
        <p className="text-gray-500">{designation}</p>

        <Rating
          style={{ maxWidth: 100 }}
          value={rating}
          readOnly
          className="mt-3 mb-5"
        />

        <hr />

        <div className="space-y-2 mt-3">
          <div className="flex justify-start items-center text-lg text-gray-600 space-x-3">
            <HiOutlineLocationMarker />
            <p>{location}</p>
          </div>

          <div className="flex justify-start items-center text-lg text-gray-600 space-x-3">
            <AiTwotoneCalendar />
            <p>Available on {availableDate}</p>
          </div>

          <div className="flex justify-start items-center text-lg text-gray-600 space-x-3">
            <AiOutlineDollar />
            <p>${price}</p>
          </div>
        </div>

        <Link className="mt-4 block" to={`/doctor/${_id}`}>
          <Button
            color="warning"
            variant="ghost"
            className="block w-full font-bold text-[var(--sec-color)] border-[var(--sec-color)]"
          >
            View Profile
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default DoctorCard;
