import React, { useEffect } from "react";
import Header from "parts/Header";
import PageDetailTitle from "parts/PageDetailTitle";
import FeaturedImage from "parts/FeaturedImage";
import PageDetailDescription from "parts/PageDetailDescription";
import BookingForm from "parts/BookingForm";
import Categories from "parts/Categories";
import Testimony from "parts/Testimony";
import Footer from "parts/Footer";
import usePageData from "hooks/usePageData";

const DetailsPage = (props) => {
  const { data: ItemDetails, loading } = usePageData("details");

  useEffect(() => {
    document.title = "Details Page";
    window.scrollTo(0, 0);
  }, []);

  if (loading || !ItemDetails) {
    return (
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  const breadcrumb = [
    { pageTitle: "Home", pageHref: "" },
    { pageTitle: "House Details", pageHref: "" },
  ];

  return (
    <>
      <Header {...props}></Header>
      <PageDetailTitle breadcrumb={breadcrumb} data={ItemDetails} />
      <FeaturedImage data={ItemDetails.imageUrls}></FeaturedImage>
      <section className="container">
        <div className="row">
          <div className="col-7 pr-5">
            <PageDetailDescription data={ItemDetails} />
          </div>
          <div className="col-5">
            <BookingForm itemDetails={ItemDetails} />
          </div>
        </div>
      </section>
      <Categories data={ItemDetails.categories} />
      <Testimony data={ItemDetails.testimonial} />
      <Footer />
    </>
  );
};

export default DetailsPage;
