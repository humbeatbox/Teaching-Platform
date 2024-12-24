import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import EditCourseComponent from "./components/editCourse-component";
import axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API_URL || "");

  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
        const response = await axios.get("/api/config");
        setApiUrl(response.data.apiUrl);
      } catch (error) {
        console.error("Error fetching API URL:", error);
        // Fall back to default API URL if configured
        if (!apiUrl && process.env.REACT_APP_API_URL) {
          setApiUrl(process.env.REACT_APP_API_URL);
        }
      }
    };
    fetchApiUrl();
  }, [apiUrl]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route
            index
            element={
              <HomeComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/register"
            element={<RegisterComponent apiUrl={apiUrl} />}
          />
          <Route
            path="/login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                apiUrl={apiUrl}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/course"
            element={
              <CourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                apiUrl={apiUrl}
              />
            }
          />
          <Route
            path="/postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                apiUrl={apiUrl}
              />
            }
          />
          <Route
            path="/enroll"
            element={
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                apiUrl={apiUrl}
              />
            }
          />
          <Route
            path="/edit-course/:courseId"
            element={
              <EditCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                apiUrl={apiUrl}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
