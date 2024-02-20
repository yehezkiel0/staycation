import Button from "elements/Button";
import React from "react";
import { Fade } from "react-awesome-reveal";

export default function Categories({ data }) {
  return data.map((category, index1) => {
    return (
      <section className="container" key={`category-${index1}`}>
        <Fade direction="up">
          <h4 className="mb-3" style={{ fontWeight: 500 }}>
            {category.name}
          </h4>
          <div className="container-grid">
            {category.items.length === 0 ? (
              <div className="row">
                <div className="col-auto align-items-center">
                  There is no property at this category
                </div>
              </div>
            ) : (
              category.items.map((item, index2) => {
                return (
                  <div
                    key={`category-${index1}-item-${index2}`}
                    className="item column-3 row-1"
                  >
                    <Fade direction="up" delay={300 * index2}>
                      <div className="card">
                        {item.isPopular && (
                          <div className="tag">
                            Popular{" "}
                            <span className="font-weight-light">Choice</span>
                          </div>
                        )}
                        <figure className="img-wrapper" style={{ height: 180 }}>
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="img-cover"
                          />
                        </figure>
                        <div className="meta-wrapper">
                          <Button
                            style={{ color: "#152C5B" }}
                            type="link"
                            className="stretched-link d-block hover"
                            href={`/properties/${item._id}`}
                          >
                            <h5 className="h4" style={{ fontWeight: 400 }}>
                              {item.name}
                            </h5>
                          </Button>
                          <span className="text-gray-500">
                            {item.city}, {item.country}
                          </span>
                        </div>
                      </div>
                    </Fade>
                  </div>
                );
              })
            )}
          </div>
        </Fade>
      </section>
    );
  });
}
