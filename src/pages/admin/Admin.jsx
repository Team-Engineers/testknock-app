import React from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link } from "react-router-dom";
import push from '../../assets/images/push-question.png'
import update from '../../assets/images/update-question.jpeg'
const Admin = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card" style={{width: "18rem"}}>
              <img className="card-img-top" src={push} alt="question-push cap" />
              <div className="card-body">
                <Link to="questionPush" className="btn btn-primary">
                    Question Push 
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card" style={{width: "18rem"}}>
              <img className="card-img-top" src={update} alt="question-update cap" />
              <div className="card-body">
                <Link to="questionUpdate" className="btn btn-primary">
                    Update Question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
