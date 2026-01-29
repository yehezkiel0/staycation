import React, { useEffect, useRef, useState } from "react";
import Header from "parts/Header";
import Hero from "parts/Hero";
import MostPicked from "parts/MostPicked";
import Categories from "parts/Categories";
import Testimony from "parts/Testimony";
import Footer from "parts/Footer";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { landingPageService } from "services/landingPage.service";

export default function LandingPage() {
  const refMostPicked = useRef();

  const [data, setData] = useState({
    hero: {},
    mostPicked: [],
    categories: [],
    testimony: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Staycation | Home";
    window.scrollTo(0, 0);

    const init = async () => {
      try {
        const result = await landingPageService.getLandingPageData();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Data</h4>
          <p>{error?.message || "Failed to load landing page data"}</p>
          <hr />
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <Fade triggerOnce>
        <Hero refMostPicked={refMostPicked} data={data.hero} />
      </Fade>

      <Slide direction="up" triggerOnce>
        <MostPicked
          refMostPicked={refMostPicked}
          data={data.mostPicked}
          loading={loading}
          error={error}
        />
      </Slide>

      <Zoom triggerOnce>
        <Categories data={data.categories} loading={loading} error={error} />
      </Zoom>

      <Fade direction="up" triggerOnce>
        <Testimony data={data.testimony} />
      </Fade>

      <Footer />
    </>
  );
}
