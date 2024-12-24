import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = ({ currentUser }) => {
  const navigate = useNavigate();
  const handleOnClickbtn = () => {
    if (currentUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">
              Modern Online Learning Platform
            </h1>
            <p className="col-md-8 fs-4">
              A full-stack learning management system built with the MERN stack
              (MongoDB, Express.js, React, Node.js). Featuring secure JWT
              authentication, RESTful API design, and responsive UI with
              Bootstrap. Demonstrating expertise in modern web development with
              real-time user interactions and database management.
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Key Technical Features</h2>
              <p>
                • Secure user authentication and role-based access control
                <br />
                • Dynamic course management system with CRUD operations
                <br />
                • Real-time course search and enrollment functionality
                <br />
                • Responsive design using Bootstrap and React components
                <br />• RESTful API endpoints with Express.js and MongoDB
              </p>
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleOnClickbtn}
              >
                Explore Platform Features
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Getting Started</h2>
              <p>
                Students can browse courses, enroll in their preferred classes,
                and track their learning progress. Instructors can create and
                manage courses, monitor student enrollment, and update course
                content. Register now to access our comprehensive learning
                management system.
              </p>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleOnClickbtn}
              >
                Join Our Platform
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2024 Gary Chang
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
