import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser, apiUrl } = props;

  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  setCurrentUser(currentUser); //for preventing ESLint error

  useEffect(() => {
    CourseService.getCourses(apiUrl)
      .then((data) => {
        console.log("Courses data:", data);
        setSearchResult(data.data.slice(0, 6)); // show first 6 courses
      })
      .catch((err) => {
        console.log("Error fetching courses:", err);
      });
    console.log("Enroll component mounted");
  }, [apiUrl]);

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    if (!searchInput.trim()) {
      window.alert("Please enter a course name.");
      return;
    }
    CourseService.getCourseByName(searchInput, apiUrl)
      .then((data) => {
        // console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id, apiUrl)
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Course name : {course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price : {course.price}</p>
                <p>Number of students : {course.students.length}</p>
                <p>Instructor : {course.instructor.username}</p>
                <p>{course._id}</p>
                {/*if student already enrolled it will be block  */}
                {course.students.includes(currentUser.user._id) ? (
                  <p>Already Enroll~</p>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="card-text btn btn-primary"
                    id={course._id}
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {currentUser && searchResult && searchResult.length === 0 && (
        <p>No courses found</p>
      )}
    </div>
  );
};

export default EnrollComponent;
