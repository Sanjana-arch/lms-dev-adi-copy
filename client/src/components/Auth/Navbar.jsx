import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = ({ user, auth, setUser, setauth }) => {
  const logout = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/users/logout`;
      const { data: res } = await axios.get(url, { withCredentials: true });

      toast.success(res.status);
      user = {};
      auth = undefined;

      window.location.replace("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response);
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-portal">
          <div className="nav-portal-top">
          </div>

          <div className="nav-portal-mid">
            <ul className="nav-portal-link">
              <li>
                {user.role === "admin" ? (
                  <Link to={`/dashboard`}>
                    <b>Admin Dashboard</b>
                  </Link>
                ) : (
                  <Link to={`/dashboard`}>
                    <b>Fecilitator Dashboard</b>
                  </Link>
                )}
              </li>

              {user.role === "admin" ? (
                <li>
                  <Link to="/addPoster">Add Poster</Link>
                </li>
              ) : (
                <></>
              )}
              {user.role !== "admin" ? (
                <li>
                  <Link to="/analytics">Analytics</Link>
                </li>
              ) : (
                <></>
              )}
              {user.role !== "admin" ? (
                <li>
                  <Link to={`/contact/${user._id}`}>Contact Us</Link>
                </li>
              ) : (
                <></>
              )}
              <li className="logoutbtn">
                <p> Hi {user.name} !</p>
              </li>
              <li >
                <button
                  className="logoutin"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
