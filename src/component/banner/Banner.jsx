import React from 'react'

const Banner = () => {
  return (
    <section>
        {/* <div className="bg-cover bg-center h-48 w-full min-h-full" style={{ backgroundImage: `url('../assets/images/banner.jpg')` }}> */}
        <div className="h-48 bg-gradient-to-r from-red-500 to-yellow-500 position-relative p-8">
          <div className="">
            <h1 className='font-bold text-4xl'>Unlock Your Potential</h1>
            <h6>Master Aptitude: Elevate Your Skills, Ace Tests, and Achieve Academic Excellence Today!</h6>
            <button className='h-10 p-2 rounded-full mt-3 bg-cyan-500 hover:bg-cyan-700 hover:text-white'>Start Quiz <i className="fa-solid fa-arrow-right"></i></button>
          </div>


        </div>
        <div className="flex items-center justify-center">
            <div className="topics">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item " role="presentation">
                    <button className="nav-link active p-3 m-3 shadow-xl rounded-xl h-32 hover:bg-sky-500 hover:text-white" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                      QUANTITATIVE APTITUDE
                    </button>
                  </li>
                  <li className="nav-item " role="presentation">
                    <button className="nav-link p-3 m-3 shadow-xl rounded-xl h-32 hover:bg-sky-500 hover:text-white" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                      DATA INTERPRETATION
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link  p-3 m-3 shadow-xl rounded-xl h-32 hover:bg-sky-500 hover:text-white" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                      LOGICAL REASONING
                    </button>
                  </li>
                  <li className="nav-item " role="presentation">
                    <button className="nav-link p-3 m-3 shadow-xl rounded-xl h-32 hover:bg-sky-500 hover:text-white" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" >
                      VERBAL ABILITY & READING COMPREHENSION
                    </button>
                  </li>
                </ul>
            </div>
          </div>
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">...</div>
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">...</div>
          <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">...</div>
          <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0">...</div>
        </div>

    </section>
  )
}

export default Banner
