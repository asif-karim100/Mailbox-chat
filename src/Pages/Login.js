import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import "./Login.css";
// import logo from "../assests/sharp-mail-low-resolution-logo-color-on-transparent-background - Copy.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePageHandler = () => {
    setIsLogin(!isLogin);
  };

  const handleSignup = async () => {
    if (!isLogin) {
      if (password === confirmPassword) {
        try {
          const url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpz3VHHFjkB3rmJAUyrjEzdadCgV-mKL8";

          const response = await axios.post(url, {
            email,
            password,
            returnSecureToken: true,
          });

          const token = response.data.idToken;

          localStorage.setItem('token', token);
          localStorage.setItem('email', response.data.email);
          dispatch(authActions.login(response.data.email));

          

          alert("Sign Up Successful, Please Login");
          setIsLogin(!isLogin);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Password Not Match");
      }
    }

    if (isLogin) {
      try {
        const url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpz3VHHFjkB3rmJAUyrjEzdadCgV-mKL8";

        const response = await axios.post(url, {
          email,
          password,
          returnSecureToken: true,
        });

        const token = response.data.idToken;


        localStorage.setItem('token', token);
        localStorage.setItem('email', response.data.email);
        dispatch(authActions.login(response.data.email));

        navigate("/mails/inbox");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ margin: "1rem" }}
    >
      <Card style={{ width: "35%" }}>
        {/* <div className="d-flex align-items-center justify-content-center mt-4">
          <img src={logo} alt="logo" className="logo" />
        </div> */}
        <Card.Body>
          <p className="text-center login-title">
            {isLogin ? "Login" : "Sign Up"}
          </p>
          {/* <p className="text-center tagline">Made by a Sharpenerian</p> */}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            {!isLogin && (
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </Form.Group>
            )}

            <Button
              type="button"
              onClick={handleSignup}
              className="w-25 mt-4 login"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <div className="w-100 mt-4">
              <p className="text">
                {" "}
                {isLogin ? "Don't Have an Account ?" : "Have an account?"}
                {""}
                <button
                  type="button"
                  className="link-like-btn"
                  onClick={togglePageHandler}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
