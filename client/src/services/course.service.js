import axios from "axios";
// const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  post(title, description, price, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    //will return a promise
    return axios.post(
      `${apiUrl}/courses`,
      { title, description, price },
      {
        headers: {
          //send the token to the server
          Authorization: token,
        },
      }
    );
  }

  //get all courses
  getCourses(apiUrl) {
    let token = "";
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    }

    return axios.get(`${apiUrl}/courses`, {
      headers: {
        Authorization: token,
      },
    });
  }

  //use student id to get the courses that student enrolled
  getEnrolledCourses(_id, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(`${apiUrl}/courses/student/` + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // use instructor id to get the courses that instructor created
  getCourseByInstructorId(_id, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(`${apiUrl}/courses/instructor/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCourseByName(name, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(`${apiUrl}/courses/findByName/` + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  enroll(_id, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      `${apiUrl}/courses/enroll/` + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //delete course by courseID
  deleteCourse(_id, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    //console.log("delete course with id: " + _id);
    return axios.delete(`${apiUrl}/courses/` + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  //update course by courseID
  updateCourse(_id, courseData, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(`${apiUrl}/courses/` + _id, courseData, {
      headers: {
        Authorization: token,
      },
    });
  }

  //get course by courseID
  getCourseById(_id, apiUrl) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(`${apiUrl}/courses/` + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

const CourseServiceInstance = new CourseService();

export default CourseServiceInstance;
