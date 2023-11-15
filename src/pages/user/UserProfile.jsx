import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Loader from "../../component/Loader/Loader";
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
// import PROFILEPIC_URL from "../../assets/images/user-profile.jpg";

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [contact, setContact] = useState("");
  const [institute, setInstitute] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mathProgress, setMathProgress] = useState("")
  const [diProgress, setDiProgress] = useState("")
  const [lrProgress, setLrProgress] = useState("")
  const [varcProgress, setVarcProgress] = useState("")
  const [file,setFile] = useState("");


  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const sliceName = useSelector((state) => state.user.name);
  // const profile_url = useSelector((state) => state.user.profilePic);
  const sliceEmail = useSelector((state) => state.user.email);
  const sliceBranch = useSelector((state) => state.user.branch);
  const sliceYear = useSelector((state) => state.user.year);
  const sliceContact = useSelector((state) => state.user.contact);
  const sliceInstitute = useSelector((state) => state.user.institute);
  const sliceSocial = useSelector((state) => state.user.social);
  const sliceProfile = useSelector((state) => state.user.profilePic);
  // const sliceSubjectProgress = useSelector((state)=>state.user.subject_progress)

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
    setFile(file)

  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (file) {
      const fileName = file.name;
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}-${fileName}`;
      const folderPath = "userProfileImages";
      const fileRef = storageRef.child(`${folderPath}/${uniqueFileName}`);

      try {
        await fileRef.put(file);

        const downloadURL = await fileRef.getDownloadURL();

        setProfilePic(downloadURL);
      } catch (error) {
        alert("Unable to upload the image");
        return;
      }
    }
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData._id) {
      const userData = {
        email: email || sliceEmail,
        name: name || sliceName,
        branch: branch || sliceBranch,
        year: year || sliceYear,
        contact: contact || sliceContact,
        institute: institute || sliceInstitute,
        profilePic: profilePic,
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
    setProfilePic(storedUserData.profilePic);
    setMathProgress(storedUserData.subject_progress.math.length)
    setDiProgress(storedUserData.subject_progress.di.length)
    setLrProgress(storedUserData.subject_progress.lr.length)
    setVarcProgress(storedUserData.subject_progress.varc.length)

    
  }, []);

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
                          class="rounded-circle p-1 border border-primary"
                          width="110"
                          height="110"
                          style={{ objectFit: "cover" }}
                        />
                        <div class="mt-3">
                          <h4>{sliceName}</h4>
                        </div>
                      </div>
                      <hr class="my-4" />
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <Link class="text-secondary" to={portfolio}>
                            <h6 class="mb-0">
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
                          <Link class="text-secondary" to={github}>
                            <h6 class="mb-0">
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
                          <Link class="text-secondary" to={linkedin}>
                            <h6 class="mb-0">
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
                          <h6 class="mb-0">Name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
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
                          <h6 class="mb-0">Email</h6>
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
                          <h6 class="mb-0">Profile Pic</h6>
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
                          <h6 class="mb-0">Branch</h6>
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
                          <h6 class="mb-0">Year</h6>
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
                          <h6 class="mb-0">Insitute</h6>
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
                          <h6 class="mb-0">Mobile</h6>
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
        </>
      )}
    </section>
  );
};

export default UserProfile;
