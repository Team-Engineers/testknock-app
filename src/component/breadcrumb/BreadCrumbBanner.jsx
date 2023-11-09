import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./BreadCrumbBanner.css";
import { Link, useParams } from "react-router-dom";

const BreadCrumbBanner = () => {
  const { topic, subTopic } = useParams();
  return (
    <section className="breadcrumb-banner mb-5">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12 h-100 d-flex flex-column justify-content-center gap-0 align-items-start">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item style={{ whiteSpace: "normal" }}>
                <Link to={`/${topic.split(" ").join("_")}`}>{topic.split("_").join(" ")}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="" style = {{textTransform:"uppercase"}}>{subTopic ? subTopic.split("_").join(" ") : ""}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
