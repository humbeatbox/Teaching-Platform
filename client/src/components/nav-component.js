import React from "react";
import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home Page
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log in
                  </Link>
                </li>

                <li className="nav-item">
                  {/* <Link onClick={handleLogout} className="nav-link" to="/"> */}
                  <Link className="nav-link" to="/">
                    Log out
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Personal Page
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/course">
                    Course Page
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/postCourse">
                    Add New Course
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/enroll">
                    Enroll Course
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
