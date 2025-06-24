import React, { useEffect, useRef } from "react";
import Header from "parts/Header";
import Hero from "parts/Hero";
import MostPicked from "parts/MostPicked";
import landingPage from "json/landingPage.json";
import Categories from "parts/Categories";
import Testimony from "parts/Testimony";
import Footer from "parts/Footer";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

export default function LandingPage() {
  const refMostPicked = useRef();

  useEffect(() => {
    document.title = "Staycation | Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <Fade triggerOnce>
        <Hero refMostPicked={refMostPicked} data={landingPage.hero} />
      </Fade>

      <Slide direction="up" triggerOnce>
        <MostPicked
          refMostPicked={refMostPicked}
          data={landingPage.mostPicked}
        />
      </Slide>

      <Zoom triggerOnce>
        <Categories data={landingPage.categories} />
      </Zoom>

      <Fade direction="up" triggerOnce>
        <Testimony data={landingPage.testimonial} />
      </Fade>

      <Footer />
    </>
  );
}
