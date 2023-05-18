import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import app from '../firebase/firebase';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginErro, setloginErro] = useState(false);
  const [verifyEmail, setverifyEmail] = useState(false);

  const handleEmailChange = (event) => {
    setloginErro(false);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setloginErro(false);
    setIsLoading(false);
    setPassword(event.target.value);
  };


  const submitHandler = async (e) => {
    setloginErro(false);
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true); // start loading animation

    // simulate a delay of 3 seconds
    setTimeout(async () => {

      const response = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });


      setIsLoading(false); // stop loading animation

      // If the server returns a success response, redirect the user to the dashboard
      if (response.ok) {


        const auth = getAuth(app);

        setTimeout(async () => {
          const response = await signInWithEmailAndPassword(auth, email, password);
          if (response.user) {
            if (response.user.emailVerified) {
              window.location.href = '/home';
            

            } else {
              setverifyEmail(false);
              // Send email verification
              await sendEmailVerification(response.user);
              alert("Please verify your email address before logging in.");
            }
          } else {

          }
        }, 1000);

      } else {
        setloginErro(true);
      }
    }, 4000);

  };

 

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">Login</button>
              </form>
              <div>
                {verifyEmail === true && (
                  <span className="error-logmessage">Please Verify email</span>
                )}
              </div>
              <div>
                {loginErro === true && (
                  <span className="error-logmessage">invalid user name and password</span>
                )}
              </div>
              {isLoading && (
                <div className="loading-container">
                  <div className={`blink ${isLoading ? "is-blinking" : ""}`}>
                    Please Wait..........
                  </div>
                </div>
              )}
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


