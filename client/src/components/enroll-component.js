import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id)
      .then(() => {
        window.alert("Enrolled successfully");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            type="text"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {/* search result */}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <p>Search result</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Course name : {course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price : {course.price}</p>
                <p>Number of students : {course.students.length}</p>
                <p>Instructor : {course.instructor.username}</p>
                <button
                  href="#"
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                  id={course._id}
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
