import { React, useState, useEffect } from "react";
import FelicitatorCard from "./FelicitatorCard";
import { Link } from "react-router-dom";
import FelicitatorTableRow from "./FelicitatorTableRow";
// import users from '../user.json';
import axios from "axios";
import Register from "../Register";

const AdminDashboard = () => {
  // console.log(users.length);
  const [users, setusers] = useState([]);
  const [showPopup, setshowPopup] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/users`;
      axios.get(url, { withCredentials: true }).then((res) => {
        setusers(res.data.data.data);
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response);
      }
    }
  };
  // console.log(users);

  return (
    <div>
      <div className="dashboard-all-users">
        <table>
          <tr >
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Games</th>
          </tr>
          {users.map((user) => {
            return <FelicitatorTableRow user={user}></FelicitatorTableRow>;
          })}
        </table>
      </div>
      {showPopup ? <Register hide={setshowPopup}></Register> : <></>}
      <div className="active-users">
        <h1>{users.length} Active Fecilitators</h1>
        <button
          onClick={() => {
            setshowPopup(true);
          }}
        >
          Add Fecilitator
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
