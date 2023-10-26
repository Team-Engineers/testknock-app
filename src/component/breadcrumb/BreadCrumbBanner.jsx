import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./BreadCrumbBanner.css";
import { useParams } from "react-router-dom";

const BreadCrumbBanner = () => {
  const { topic, subTopic } = useParams();
  return (
    <section className="breadcrumb-banner">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12 h-100 d-flex flex-column justify-content-center gap-0 align-items-start">
            <Breadcrumb>
              <Breadcrumb.Item >Home</Breadcrumb.Item>
              <Breadcrumb.Item >{topic}</Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="">
                    {subTopic}
            </h2>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
