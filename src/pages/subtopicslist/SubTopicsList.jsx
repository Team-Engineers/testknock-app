import React from 'react'
import Header from '../../component/header/Header'
import BreadCrumbBanner from '../../component/breadcrumb/BreadCrumbBanner'
import Footer from '../../component/footer/Footer'
import SubTopics from '../../component/subtopics/SubTopics'
import { useParams } from 'react-router-dom'

const SubTopicsList = () => {
  const { topic} = useParams();

  return (
    <div>
      <Header/>
      <BreadCrumbBanner />
      <SubTopics topic = {topic}/>
      <Footer/>
    </div>
  )
}

export default SubTopicsList
