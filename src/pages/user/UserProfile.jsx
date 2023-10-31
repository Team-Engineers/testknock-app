import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSliceEmail,
  setSliceName,
  setSliceProfilePic,
  setSliceBranch,
  setSliceYear,
  setSliceContact,
  setSliceInstitute,
} from "../../utils/userSlice";
import Header from "../../component/header/Header";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { PROFILEPIC_URL } from "../../utils/constants";

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [contact, setContact] = useState("");
  const [institute, setInstitute] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const sliceName = useSelector((state) => state.user.name);
  const profile_url = useSelector((state) => state.user.profilePic);
  const sliceEmail = useSelector((state) => state.user.email);
  const sliceBranch = useSelector((state) => state.user.branch);
  const sliceYear = useSelector((state) => state.user.year);
  const sliceContact = useSelector((state) => state.user.contact);
  const sliceInstitute = useSelector((state) => state.user.institute);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("user")); // Parse the JSON string to get the object
    // console.log("localstorage data", storedUserData);
    if (storedUserData._id) {
      const userData = {
        email: email || sliceEmail,
        name: name || sliceName,
        branch: branch || sliceBranch,
        year: year || sliceYear,
        contact: contact || sliceContact,
        institute: institute || sliceInstitute,
        profilePic: profilePic,
      };

      const accessToken = JSON.parse(localStorage.getItem("accessToken")).token;
      // console.log("accesstoken", accessToken);
      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        axios
          .put(
            `https://ourntamockpapers.onrender.com/api/users/${storedUserData._id}`,
            userData,
            {
              headers: headers,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              const user = response.data;
              localStorage.setItem("user", JSON.stringify(user));
              setDetails();
              alert("User data updated successfully");

            } else {
              alert("Failed to update user data, Email is in use");
            }
          })
          .catch((error) => {
            alert("Failed to update user data");
          });
      } else {
        alert("Access token not found in local storage");
      }
    }
  };
  const setDetails = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      dispatch(setSliceName(storedUserData.name || sliceName));
      dispatch(setSliceEmail(storedUserData.email || sliceEmail));

      dispatch(
        setSliceProfilePic(storedUserData.profilePic || PROFILEPIC_URL)
      );
      // setName(storedUserData.name || sliceName)

      dispatch(setSliceBranch(storedUserData.branch || sliceBranch));

      dispatch(setSliceYear(storedUserData.year || sliceYear));

      dispatch(setSliceInstitute(storedUserData.institute || sliceInstitute));

      dispatch(setSliceContact(storedUserData.contact || sliceContact));
      
    } 
    else {
      localStorage.removeItem("accessToken");
      Navigate("/login");
    }
  };

  useEffect(()=>{
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    // console.log("data browser",storedUserData)
    setName(storedUserData.name)
    setEmail(storedUserData.email )
    setBranch(storedUserData.branch)
    // console.log("branch",storedUserData.branch)
    setYear(storedUserData.year)
    setInstitute(storedUserData.institute)
    setContact(storedUserData.contact);

  },[])

  return (
    <section className="userProfile">
      <Header />
      <div class="container">
        <div class="main-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src={profile_url}
                      alt="user"
                      class="rounded-circle p-1 bg-primary"
                      width="110"
                      height="110"
                    />
                    <div class="mt-3">
                      <h4>{sliceName}</h4>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                        <i class="fa-solid fa-globe me-2"></i>
                        Website
                      </h6>
                      <span class="text-secondary">https://bootdey.com</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                        <i class="fa-brands me-2 fa-github"></i>
                        Github
                      </h6>
                      <span class="text-secondary">bootdey</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                        <i class="fa-brands me-2 fa-x-twitter"></i>
                        Twitter
                      </h6>
                      <span class="text-secondary">@bootdey</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                        <i class="fa-brands me-2 fa-instagram"></i>
                        Instagram
                      </h6>
                      <span class="text-secondary">bootdey</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                        <i class="fa-brands me-2 fa-facebook-f"></i>
                        Facebook
                      </h6>
                      <span class="text-secondary">bootdey</span>
                    </li>
                  </ul>
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
                        // value={profilePic}
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
                      <h5 class="d-flex align-items-center mb-3">Progress</h5>
                      <p>Quantitative Aptitude</p>
                      <div class="progress mb-3" style={{ height: "5px" }}>
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "72%" }}
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
                          style={{ width: "89%" }}
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
                          style={{ width: "55%" }}
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
                          style={{ width: "66%" }}
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
    </section>
  );
};

export default UserProfile;
