import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../services/course.service";

const EditCourseComponent = ({ apiUrl }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    CourseService.getCourseById(courseId, apiUrl)
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch course data");
      });
  }, [courseId, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    const updatedCourseData = {
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
    };
    CourseService.updateCourse(courseId, updatedCourseData, apiUrl)
      .then(() => {
        alert("Course updated successfully");
        navigate("/course");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          console.log("Request made but no response:", error.request);
        } else {
          console.log("Error", error.message);
        }
        alert("Failed to update course");
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      <h2>Edit Course</h2>
      <form onSubmit={handleUpdateCourse}>
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Course Description</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Course Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            className="form-control"
            min="0"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourseComponent;
