import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, apiUrl }) => {
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
        CourseService.getCourseByInstructorId(_id, apiUrl)
          .then((data) => {
            setCourseData(data.data);
            //console.log(data);
            // if (Array.isArray(data.data)) {
            //   setCourseData(data.data);
            // } else {
            //   console.error("Expected an array but got:", data.data);
            //   setCourseData([]);
            // }
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "student") {
        CourseService.getEnrolledCourses(_id, apiUrl)
          .then((data) => {
            // console.log(data);
            // setCourseData(data.data);
            if (Array.isArray(data.data)) {
              setCourseData(data.data);
            } else {
              console.error("Expected an array but got:", data.data);
              setCourseData([]);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [apiUrl, currentUser]);

  const handleDeleteCourse = (e) => {
    const courseId = e.target.id;
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmed) {
      return;
    }
    CourseService.deleteCourse(courseId, apiUrl)
      .then((data) => {
        window.alert("Delete successfully");
        setCourseData((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUpdateCourse = (e) => {
    const courseId = e.target.id;
    // const _id = currentUser.user._id;
    navigate(`/edit-course/${courseId}`);
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You should login !</p>
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
          <h1>You are a Instructor</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>You are a Student</h1>
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
                  <p>Course ID : {course._id}</p>
                  {currentUser.user.role === "instructor" && (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={handleDeleteCourse}
                        id={course._id}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleUpdateCourse}
                        id={course._id}
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Edit
                      </button>
                    </>
                  )}
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
