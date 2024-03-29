import React from "react";
import Button from "elements/Button";
import HeroImage from "assets/images/img-hero.jpg";
import HeroImage_ from "assets/images/img-hero-frame.jpg";
import numberFormat from "utils/formatNumber";
import { Fade } from "react-awesome-reveal";

export default function Hero(props) {
  function showMostPicked() {
    window.scrollTo({
      top: props.refMostPicked.current.offsetTop - 30,

      behavior: "smooth",
    });
  }
  return (
    <Fade direction="up" delay={400}>
      <section className="container pt-4">
        <div className="row align-items-center justify-content-between ">
          <div className="col-auto pr-5" style={{ width: 530 }}>
            <h1
              className="mb-3"
              style={{ fontWeight: 800, lineHeight: "70px" }}
            >
              Forget Busy Work, <br />
              Start Next Vacation
            </h1>
            <p
              className="mb-4"
              style={{
                color: "#B0B0B0",
                fontWeight: 300,
                lineHeight: "170%",
                width: 340,
                wordSpacing: "2px",
              }}
            >
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </p>
            <Button
              className="btn px-5"
              hasShadow
              isPrimary
              onClick={showMostPicked}
              type="link"
            >
              Show Me Now
            </Button>

            <div className="row" style={{ marginTop: 80 }}>
              <div className="col-auto" style={{ marginRight: 35 }}>
                <img
                  width="36"
                  height="36"
                  src="images/icon_traveler.svg"
                  alt={`${props.data.travelers} Travelers`}
                />
                <h6 className="mt-3">
                  {numberFormat(props.data.travelers)}{" "}
                  <span className="text-gray-500 font-weight-light">
                    travelers
                  </span>
                </h6>
              </div>

              <div className="col-auto" style={{ marginRight: 35 }}>
                <img
                  width="36"
                  height="36"
                  src="images/icon_treasure.svg"
                  alt={`${props.data.treasures} Treasures`}
                />
                <h6 className="mt-3">
                  {props.data.treasures}{" "}
                  <span className="text-gray-500 font-weight-light">
                    treasures
                  </span>
                </h6>
              </div>
              <div className="col-auto">
                <img
                  width="36"
                  height="36"
                  src="images/icon_cities.svg"
                  alt={`${props.data.treasures} Cities`}
                />
                <h6 className="mt-3">
                  {numberFormat(props.data.cities)}{" "}
                  <span className="text-gray-500 font-weight-light">
                    cities
                  </span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="img-hero">
              <img
                src={HeroImage}
                alt="Room with couches"
                className="img-fluid position-absolute"
                style={{
                  margin: "-40px 0 0 -53px",
                  zIndex: 1,
                }}
              />
              <img
                src={HeroImage_}
                alt="Room with couches frame"
                className="img-fluid position-absolute"
                style={{ margin: "0 -15px -15px 0" }}
              />
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}
