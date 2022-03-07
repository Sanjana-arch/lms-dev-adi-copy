import { useEffect, useState, Component } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const checkLogin = async (e) => {
    e.preventDefault();
    // console.log(`${email} ${pwd}`);
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/users/login`;
      const { data: res } = await axios.post(
        url,
        {
          email,
          password: pwd,
        },
        { withCredentials: true }
      );
      //
      toast.success(res.status);
      console.log(res);
      window.location.replace("/dashboard");
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

  const handleGoogleLogin = async (googleData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/google`,
        {
          token: googleData.tokenId,
        },
        { withCredentials: true }
      );
      toast.success(res.data.status);
      console.log(res);
      window.location.replace("/dashboard");
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

  const handleGoogleLoginFaliure = (res) => {
    console.log(res.error);
    toast.error(res.error);
  };

  return (
    <center>
      <div className="login-form">
        <h1 style={{ fontSize:"30px"  }}><strong>Login</strong></h1>
        <div className="login-form-wrapper">
          <form onSubmit={checkLogin}>
            <div className="input-group">
              <label htmlFor="email">Email: &nbsp; &nbsp;&nbsp; &nbsp;</label>
              &nbsp; &nbsp;
              <input
                type="email"
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:&nbsp; &nbsp;</label>
              <input
                type="password"
                name="password"
                required
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
            </div>
            <br></br>
            <button type="submit" >Login</button>
          </form>
          <br></br>
          <Link to="/forgotPassword">Forgot password</Link>
          <br></br>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLoginFaliure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </center>
  );
};

export default Login;
