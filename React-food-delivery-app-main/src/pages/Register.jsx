import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, } from "firebase/auth";
import app from '../firebase/firebase';

const Register = () => {
  const signupNameRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();
  const signupContactRef = useRef();
  const [userExists, setUserExists] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const signupPasswordConfirmRef = useRef();
  const [registerSuccess, setRegisterSuccess] = useState(false);



  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    // Regular expression to check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(value));
  };

  const handleInputChange = () => {
    setUserExists(false);
  };

  const handlePasswordConfirmChange = () => {
    setPasswordMatch(signupPasswordRef.current.value === signupPasswordConfirmRef.current.value);
  };
  
 

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      userName: signupNameRef.current.value,
      email: signupEmailRef.current.value,
      contactNo:signupContactRef.current.value,
      password: signupPasswordRef.current.value
    };

    axios.post('http://localhost:8080/api/v1/user/create', data)
      .then(response => {
        setRegisterSuccess(true);
        console.log(response.data);
        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, signupEmailRef.current.value, signupPasswordRef.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
    
            sendEmailVerification(user)
              .then(() => {
                alert("Verification email sent!");
              })
              .catch((error) => {
                console.log(error);
              });
    
            // Redirect user to home page or some other location
            // ...
    
          })
          .catch((error) => {
            console.log(error);
            // ..
          });
         
      })
      .catch(error => {
        console.error(error);
        setUserExists(true);
      });

  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    ref={signupNameRef}
                    onChange={handleInputChange}
                    style={{ borderColor: userExists === null ? '' : (userExists ? 'red' : 'green') }}
                  />

                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={signupEmailRef}
                    value={email}
                    onChange={handleEmailChange}
                    style={{ borderColor: 'green' }}
                  />
                  {!emailValid && email.length > 0 && <span style={{ color: 'red' }}>Invalid email format</span>}
                </div>


                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    ref={signupContactRef}
                   
                    style={{ borderColor: 'green' }}
                  />
                  {/* {!emailValid && email.length > 0 && <span style={{ color: 'red' }}>Invalid email format</span>} */}
                </div>
                
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={signupPasswordRef}
                    onChange={handlePasswordConfirmChange}
                    style={{ borderColor: passwordMatch ? 'green' : 'red' }}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    ref={signupPasswordConfirmRef}
                    onChange={handlePasswordConfirmChange}
                    style={{ borderColor: passwordMatch ? 'green' : 'red' }}
                  />
                  {!passwordMatch && <span style={{ color: 'red' }}>Passwords do not match</span>}

                </div>

                <button type="submit" className="addTOCart__btn">
                  Sign Up
                </button>
                <div>
                  {userExists === true && (
                    <span className="error-message">User already exists</span>
                  )}
                </div>
                <div>{registerSuccess && (
                  <span className="success-message">User registered successfully!</span>
                )}</div>

              </form>

              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
