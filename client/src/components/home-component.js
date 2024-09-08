import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = ({ currentUser }) => {
  const navigate = useNavigate();
  const handleOnClickbtn = () => {
    if (currentUser) {
      console.log(currentUser);
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
            <h1 className="display-5 fw-bold">Learning Retail Platform</h1>
            <p className="col-md-8 fs-4">
              This system uses React.js as the front-end framework, Node.js,
              MongoDB as a backend server. This kind of project is called MERN
              Project, it is one of the most popular ways to create modern
              websites.
            </p>
            {/* <button className="btn btn-primary btn-lg" type="button">
              See how it works.
            </button> */}
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a Student</h2>
              <p>
                Students can register for courses of their choice. This site is
                for practice purposes only, please do not provide any personal
                information such as credit card numbers.
              </p>
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleOnClickbtn}
              >
                Log in as a member or register a new account
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>As a Instructor</h2>
              <p>
                You can become an instructor by signing up and start creating
                online courses. This site is for practice purposes only, please
                do not provide any personal information such as credit card
                numbers.
              </p>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleOnClickbtn}
              >
                Start a new courses today
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
