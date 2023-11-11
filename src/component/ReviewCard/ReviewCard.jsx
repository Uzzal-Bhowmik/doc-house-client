import React from "react";
import "./ReviewCard.css";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ singleReview }) => {
  const { name, img, review, profession, rating } = singleReview;

  return (
    <div className="keen-slider__slide border rounded-xl">
      <div className="card-header mb-4">
        <div className="img-name-con">
          <img src={img} />
          <div className="ms-3">
            <h5 className="text-xl font-bold">{name}</h5>
            <div className="flex items-center gap-4">
              <p className="text-gray-400">{profession}</p>
              {rating && (
                <span className="flex items-center text-yellow-500 font-bold">
                  (<FaStar />
                  <span className="ms-1 pt-[1px]">{rating}/5</span>)
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <FaQuoteLeft className="text-4xl text-[var(--sec-color)]" />
        </div>
      </div>

      <p className="text-gray-600">{review}</p>
    </div>
  );
};

export default ReviewCard;
