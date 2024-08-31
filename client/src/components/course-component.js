import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      // check if the user is instructor or student
      if (currentUser.user.role === "instructor") {
        CourseService.getCourseByInstructorId(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            // console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You ust login !</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            back to login
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>You are Instructor</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>You are Student</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Course Name:{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    Students numbers: {course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    Course price {course.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
