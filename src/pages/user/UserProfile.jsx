import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Loader from "../../component/Loader/Loader";
import Footer from '../../component/footer/Footer'
import {
  setSliceEmail,
  setSliceName,
  setSliceProfilePic,
  setSliceBranch,
  setSliceYear,
  setSliceContact,
  setSliceInstitute,
  setSliceSocial,
  setSliceSubjectProgress,
} from "../../utils/userSlice";
import Header from "../../component/header/Header";
import axios from "axios"; // Import Axios
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/constants";
import { useCallback } from "react";

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [contact, setContact] = useState("");
  const [institute, setInstitute] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mathProgress, setMathProgress] = useState("");
  const [diProgress, setDiProgress] = useState("");
  const [lrProgress, setLrProgress] = useState("");
  const [varcProgress, setVarcProgress] = useState("");
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const sliceName = useSelector((state) => state.user.name);
  const sliceEmail = useSelector((state) => state.user.email);
  const sliceBranch = useSelector((state) => state.user.branch);
  const sliceYear = useSelector((state) => state.user.year);
  const sliceContact = useSelector((state) => state.user.contact);
  const sliceInstitute = useSelector((state) => state.user.institute);
  const sliceSocial = useSelector((state) => state.user.social);
  const sliceProfile = useSelector((state) => state.user.profilePic);

  const fetchData = async (api) => {
    try {
      const response = await axios.get(api);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const calculateQuestionsLength = useCallback(async () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const lrApiV1 = `${API}/lr/question/v1`;
    const varcApiV1 = `${API}/varc/question/v1`;
    const diApiV1 = `${API}/di/question/v1`;
    const mathApiV1 = `${API}/math/question/v1`;
    const lrApiV2 = `${API}/lr/question/v2`;
    const varcApiV2 = `${API}/varc/question/v2`;
    // const diApiV2 = `${API}/di/question/v2`;
    const mathApiV2 = `${API}/math/question/v2`;

    try {
      let lrLength = 0,varcLength = 0,diLength = 0,mathLength = 0;  
       lrLength = localStorage.getItem("lrLength");
       varcLength = localStorage.getItem("varcLength");
       diLength = localStorage.getItem("diLength");
       mathLength = localStorage.getItem("mathLength");
      if (!lrLength || !varcLength || !diLength || !mathLength) {
        let lrQuestions1 = await fetchData(lrApiV1);
        let varcQuestions1 = await fetchData(varcApiV1);
        let diQuestions1 = await fetchData(diApiV1);
        let mathQuestions1 = await fetchData(mathApiV1);
        let lrQuestions2 = await fetchData(lrApiV2);
        let varcQuestions2 = await fetchData(varcApiV2);
        //let  diQuestions2 = await fetchData(diApiV2);
        let mathQuestions2 = await fetchData(mathApiV2);

        lrQuestions1.map((para) => {
          return (lrLength += para.questions.length);
        });

        varcQuestions1.map((para) => {
          return (varcLength += para.questions.length);
        });

        diQuestions1.map((para) => {
          return (diLength += para.questions.length);
        });

        mathQuestions1.map((para) => {
          return (mathLength += para.questions.length);
        });

        lrLength += lrQuestions2.length;
        varcLength += varcQuestions2.length;

        mathLength += mathQuestions2.length;

        localStorage.setItem("lrLength", lrLength);
        localStorage.setItem("varcLength", varcLength);
        localStorage.setItem("diLength", diLength);
        localStorage.setItem("mathLength", mathLength);
      }
      const mathSolved = storedUserData.subject_progress.math.length;
      const diSolved = storedUserData.subject_progress.di.length;
      const lrSolved = storedUserData.subject_progress.lr.length;
      const varcSolved = storedUserData.subject_progress.varc.length;

      const mathProgress = Math.ceil((mathSolved / mathLength) * 100);
      const diProgress = Math.ceil((diSolved / diLength) * 100);
      const varcProgress = Math.ceil((varcSolved / varcLength) * 100);
      const lrProgress = Math.ceil((lrSolved / lrLength) * 100);
      setMathProgress(mathProgress);
      setDiProgress(diProgress);
      setVarcProgress(varcProgress);
      setLrProgress(lrProgress);
    } catch (error) {
    }
  }, []);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const storageRef = storage.ref();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let storedUserData = JSON.parse(localStorage.getItem("user"));

    if (file) {
      const fileName = file.name;
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}-${fileName}`;
      const folderPath = "userProfileImages";
      const fileRef = storageRef.child(`${folderPath}/${uniqueFileName}`);

      try {
        await fileRef.put(file);

        const downloadURL = await fileRef.getDownloadURL();

        const updatedUserData = {
          ...storedUserData,
          profilePic: downloadURL,
        };

        localStorage.setItem("user", JSON.stringify(updatedUserData));
        storedUserData = updatedUserData;
        setFile('');
      } catch (error) {
        setIsLoading(false);
        alert("Unable to upload the image");
        return;
      }
    }
    if (storedUserData._id) {
      const userData = {
        email: email || sliceEmail,
        name: name || sliceName,
        branch: branch || sliceBranch,
        year: year || sliceYear,
        contact: contact || sliceContact,
        institute: institute || sliceInstitute,
        profilePic: storedUserData.profilePic,
        social: {
          github: github || sliceSocial.github,
          linkedin: linkedin || sliceSocial.linkedin,
          portfolio: portfolio || sliceSocial.portfolio,
        },
      };

      const accessToken = JSON.parse(localStorage.getItem("accessToken")).token;
      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        axios
          .put(`${API}/users/${storedUserData._id}`, userData, {
            headers: headers,
          })
          .then((response) => {
            setIsLoading(false);
            if (response.status === 200) {
              const user = response.data;
              localStorage.setItem("user", JSON.stringify(user));
              setDetails();
            } else {
              // alert("Failed to update user data, Email is in use error1");
            }
          })
          .catch((error) => {
            setIsLoading(false);
            // alert(error);
          });
      } else {
        setIsLoading(false);
        // alert("error3");
      }
    }
  };

  const setDetails = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      dispatch(setSliceName(storedUserData.name || sliceName));
      dispatch(setSliceEmail(storedUserData.email || sliceEmail));

      dispatch(setSliceProfilePic(storedUserData.profilePic));

      dispatch(setSliceBranch(storedUserData.branch || sliceBranch));

      dispatch(setSliceYear(storedUserData.year || sliceYear));

      dispatch(setSliceInstitute(storedUserData.institute || sliceInstitute));

      dispatch(setSliceContact(storedUserData.contact || sliceContact));

      dispatch(setSliceSocial(storedUserData.social));

      dispatch(setSliceSubjectProgress(storedUserData.subject_progress));
    } else {
      localStorage.removeItem("accessToken");
      Navigate("/login");
    }
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setName(storedUserData.name);
    setEmail(storedUserData.email);
    setBranch(storedUserData.branch);
    setYear(storedUserData.year);
    setInstitute(storedUserData.institute);
    setContact(storedUserData.contact);
    setGithub(storedUserData.social.github);
    setLinkedin(storedUserData.social.linkedin);
    setPortfolio(storedUserData.social.portfolio);
    calculateQuestionsLength();
  }, [calculateQuestionsLength]);

  return (
    <section className="userProfile">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div class="container">
            <div class="main-body">
              <div class="row">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex flex-column align-items-center text-center">
                        <img
                          src={sliceProfile}
                          alt="user"
                          class="rounded-circle p-1 "
                          width="110"
                          height="110"
                          style={{ objectFit: "cover", border: "1px solid #79090b"  }}
                        />
                        <div class="mt-3">
                          <h4>{sliceName}</h4>
                        </div>
                      </div>
                      <hr class="my-4" />
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <Link to={portfolio}>
                            <h6 class="mb-0 text-black">
                              <i class="fa-solid fa-globe me-2"></i>
                              Portfolio
                            </h6>
                          </Link>

                          <div class="row">
                            <div class="col text-secondary">
                              <input
                                type="text"
                                class="form-control"
                                value={portfolio}
                                onChange={(e) => {
                                  setPortfolio(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <Link to={github}>
                            <h6 class="mb-0 text-black">
                              <i class="fa-brands me-2 fa-github"></i>
                              Github
                            </h6>
                          </Link>

                          <div class="row">
                            <div class="coltext-secondary">
                              <input
                                type="text"
                                class="form-control"
                                value={github}
                                onChange={(e) => {
                                  setGithub(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <Link to={linkedin}>
                            <h6 class="mb-0 text-black">
                              <i class="fa-brands me-2 fa-linkedin"></i>
                              Linkedin
                            </h6>
                          </Link>

                          <div class="row">
                            <div class="col text-secondary">
                              <input
                                type="text"
                                class="form-control"
                                value={linkedin}
                                onChange={(e) => {
                                  setLinkedin(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="row text-center my-3">
                        <div class="col text-secondary">
                          <input
                            type="button"
                            class="btn btn-primary px-4"
                            value="Save Changes"
                            onClick={handleFormSubmit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card">
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0 text-black">Name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary text-center">
                          <input
                            type="text"
                            class="form-control"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0 text-black">Email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0 text-black">Profile Pic</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="file"
                            class="form-control"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0 text-black">Branch</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={branch}
                            onChange={(e) => {
                              setBranch(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0 text-black">Year</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="number"
                            class="form-control"
                            value={year}
                            onChange={(e) => {
                              setYear(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0 text-black">Insitute</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={institute}
                            onChange={(e) => {
                              setInstitute(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0 text-black">Mobile</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={contact}
                            onChange={(e) => {
                              setContact(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="button"
                            class="btn btn-primary px-4"
                            value="Save Changes"
                            onClick={handleFormSubmit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="d-flex align-items-center mb-3">
                            Progress
                          </h5>
                          <p>Quantitative Aptitude</p>
                          <div class="progress mb-3" style={{ height: "5px" }}>
                            <div
                              class="progress-bar bg-danger"
                              role="progressbar"
                              style={{ width: `${mathProgress}%` }}
                              aria-valuenow="72"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <p>Data Interpretation</p>
                          <div class="progress mb-3" style={{ height: "5px" }}>
                            <div
                              class="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: `${diProgress}%` }}
                              aria-valuenow="89"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <p>Logical Reasoning</p>
                          <div class="progress mb-3" style={{ height: "5px" }}>
                            <div
                              class="progress-bar bg-warning"
                              role="progressbar"
                              style={{ width: `${lrProgress}%` }}
                              aria-valuenow="55"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <p>Verbal Ability & Reading Comprehension</p>
                          <div class="progress" style={{ height: "5px" }}>
                            <div
                              class="progress-bar bg-info"
                              role="progressbar"
                              style={{ width: `${varcProgress}%` }}
                              aria-valuenow="66"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      )}
    </section>
  );
};

export default UserProfile;
