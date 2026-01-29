import React from "react";
import { Fade } from "react-awesome-reveal";

// import Breadcrumb from "elements/Breadcrumb";

export default function PageDetailTitle({ data, breadcrumb }) {
  return (
    <section className="container spacing-sm">
      <Fade direction="up">
        <div className="row align-items-center">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {breadcrumb &&
                  breadcrumb.map((item, index) => (
                    <li
                      key={index}
                      className={`breadcrumb-item ${
                        index === breadcrumb.length - 1 ? "active" : ""
                      }`}
                    >
                      {index === breadcrumb.length - 1 ? (
                        item.pageTitle
                      ) : (
                        <a href={item.pageHref}>{item.pageTitle}</a>
                      )}
                    </li>
                  ))}
              </ol>
            </nav>
          </div>
          <div className="col-auto text-center">
            <h1 className="h2">{data.name}</h1>
            <span className="text-gray-400">
              {data.city}, {data.country}
            </span>
          </div>
          <div className="col"></div>
        </div>
      </Fade>
    </section>
  );
}
