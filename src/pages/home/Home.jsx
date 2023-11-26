import React from "react";
import Header from "../../component/header/Header";
import Banner from "../../component/banner/Banner";
import Footer from "../../component/footer/Footer";
import NewHome from "../../component/newhome/NewHome";

const Home = () => {
  return (
    <section style = {{backgroundColor:"#fff7f7"}}>
      <Header />
      <Banner />
      <NewHome/>
      <Footer />
    </section>
  );
};

export default Home;
