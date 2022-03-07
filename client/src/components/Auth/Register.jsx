import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Register = ({ hide }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    console.log(`${email} ${name}`);

    	try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/users/signup`;
			const res = await axios.post(
				url,
				{
					name,
					email,
					phoneNumber: number
				},
				{ withCredentials: true }
			);
			toast.success(res.data.message);
			console.log(res);
			hide(false)
      window.location.reload();
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
    <div className="popup">
      {" "}
      <div className="login-form">
        <b>Register Page</b>
        <div className="login-form-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (number.length >= 10) signUp();
              else toast.error("Enter valid data");
            }}
          >
            <div className="input-group">
              <label for="username">Username:&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; </label>
              <input
                type="text"
                name="username"
				value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label for="email">Email:&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; </label>
              <input
                type="email"
                name="email"
				value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label for="phonenumber">Phone Number:</label>
              <input
                type="number"
                name="phonenumber"
				value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
            </div>
           
           <div style={{display:"flex", marginTop:20}}>
            <button type="submit">Register</button>

            <button style={{marginLeft:20}}
              onClick={(e) => {
                e.preventDefault();
                hide(false);
              }}
            >
              Cancel
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
