import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Banner from "../../component/banner/Banner";
import Footer from "../../component/footer/Footer";
import SubTopics from "../../component/subtopics/SubTopics";
import Subjects from "../../component/subjects/Subjects";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setName, setProfilePic } from "../../utils/userSlice";
import UserProfile from "../../assets/images/user-profile.jpg";


const SubTopicsWrapper = styled.div`
  position: absolute;
  top: 15rem;
  left: 0;
  right: 0;
`;

const Home = () => {
  
  const [topic, setSelectedTopic] = useState("QUANT");

  const dispatch = useDispatch();

  useEffect(() => {
    const handleUserName = () => {
      dispatch(setName('Ashutosh'));
    }
  
    const handleProfile = () => {
      dispatch(setProfilePic(UserProfile));
    }
  
    handleUserName();
    handleProfile();
    console.log('usereffect is called from home');
  }, [dispatch]);
  


  return (
    <>
      <Header />
      <div className="position-relative">
        <Banner />
        <SubTopicsWrapper>
          <Subjects setSelectedTopic={setSelectedTopic} />
        </SubTopicsWrapper>
      </div>
      <SubTopics topic={topic} />

      <Footer />
    </>
  );
};

export default Home;
