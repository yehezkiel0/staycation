import React, { useEffect, useRef } from "react";
import Header from "parts/Header";
import Hero from "parts/Hero";
import MostPicked from "parts/MostPicked";
import Categories from "parts/Categories";
import Testimony from "parts/Testimony";
import Footer from "parts/Footer";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { useCategories, useProperties } from "hooks/useAPI";
import landingPage from "json/landingPage.json";

export default function LandingPage() {
  const refMostPicked = useRef();

  // Use API hooks
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    properties: mostPickedProperties,
    loading: propertiesLoading,
    error: propertiesError,
    fetchMostPicked,
  } = useProperties();

  // State for API data - removed, using hooks directly

  useEffect(() => {
    document.title = "Staycation | Home";
    window.scrollTo(0, 0);

    // Fetch most picked properties
    fetchMostPicked().catch(console.error);
  }, [fetchMostPicked]);

  // Show loading state
  if (categoriesLoading || propertiesLoading) {
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

  // Transform API data to match component expectations
  const transformedCategories = categories.map((category, index) => ({
    _id: category._id,
    name: category.name,
    description: category.description,
    imageUrl: category.image?.url || `/images/image-category-${index + 1}.jpg`,
    country: "Indonesia",
    cities: category.propertyCount || 0,
    propertiesCount: category.propertyCount || 0,
  }));

  const transformedMostPicked = mostPickedProperties.map((property, index) => ({
    _id: property._id,
    name: property.title || property.name,
    type: property.type,
    imageUrl:
      property.imageUrls?.[0]?.url ||
      property.imageUrls?.[0] ||
      `/images/image-mostpicked-${index + 1}.jpg`,
    city: property.location?.city || property.city,
    country: property.location?.country || property.country || "Indonesia",
    price: property.price?.amount || property.price,
    unit: property.price?.unit || property.unit || "night",
    rating: property.ratings?.average || property.rating || 0,
    reviewCount: property.ratings?.count || property.reviewCount || 0,
    isPopular: property.isPopular || false,
  }));

  // Fallback to JSON data if API fails or no data
  const heroData = landingPage.hero;
  const categoriesData =
    transformedCategories.length > 0
      ? transformedCategories
      : landingPage.categories;
  const mostPickedData =
    transformedMostPicked.length > 0
      ? transformedMostPicked
      : landingPage.mostPicked;
  const testimonyData = landingPage.testimonial;

  return (
    <>
      <Header />

      <Fade triggerOnce>
        <Hero refMostPicked={refMostPicked} data={heroData} />
      </Fade>

      <Slide direction="up" triggerOnce>
        <MostPicked
          refMostPicked={refMostPicked}
          data={mostPickedData}
          loading={propertiesLoading}
          error={propertiesError}
        />
      </Slide>

      <Zoom triggerOnce>
        <Categories
          data={categoriesData}
          loading={categoriesLoading}
          error={categoriesError}
        />
      </Zoom>

      <Fade direction="up" triggerOnce>
        <Testimony data={testimonyData} />
      </Fade>

      <Footer />
    </>
  );
}
