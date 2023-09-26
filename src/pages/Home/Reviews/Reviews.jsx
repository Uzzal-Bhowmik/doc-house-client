import React, { useEffect, useState } from "react";
import "./Reviews.css";
import ReviewCard from "../../../component/ReviewCard/ReviewCard";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // keen slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 1, spacing: 5 },
        },
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 15 },
        },
        "(min-width: 1500px)": {
          slides: { perView: 3, spacing: 20 },
        },
      },
      loop: true,
      slides: { perView: 1 },
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="my-20 container">
      <div className="text-center mb-16 space-y-4 w-3/4 mx-auto">
        <h1 className="text-4xl font-bold">What Our Patient Says</h1>
        <p className="text-[#3B3A3A]">
          We are honored to share their stories, showcasing the impact of our
          dedicated dental therapies on their lives. These patient reviews are a
          testament to our commitment to excellence, and we look forward to
          adding your success story to our collection.
        </p>
      </div>

      {reviews.length && (
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
            {reviews?.map((singleReview) => (
              <ReviewCard key={singleReview._id} singleReview={singleReview} />
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 2
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default Reviews;
