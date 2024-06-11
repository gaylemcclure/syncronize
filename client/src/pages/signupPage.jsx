import React, { useState } from "react";
import styled from "styled-components";
import icon from "../assets/images/sync-icon.png";

const SignupPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //Find out which page user is on
  const pathName = window.location.pathname;

  //Text to show when on login page
  const LoginText = () => {
    return <h2>Welcome back to Sycronize</h2>;
  };

  //Text and inputs to show when on signup page
  const SignupText = () => {
    return (
      <>
        <h2>Welcome to Sycronize</h2>
      </>
    );
  };

  const handleSignup = () => {
    //Call api to save new user to the db
  }

  return (
    <div className="flex-row">
      <InputContainer>
        <Icon src={icon} alt="syncronize icon" />
        {pathName === "/signup" ? <SignupText /> : <LoginText />}
        {pathName === "/signup" && (
        <div className="flex-row input-container">
        <input placeholder="First name" className="input-gap" type="email" value={firstName} onInput={(e) => setFirstName(e.target.value)} />
        <input placeholder="Last name" value={lastName} onInput={(e) => setLastName(e.target.value)}/>
      </div>

        )}
        <input placeholder="Email" type="email" value={email} onInput={(e) => setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
        <button className="signup-button" id="signup-button" onClick={handleSignup}>
          Sign up
        </button>

        {pathName === "/signup" ? 
            <p>
            Already have an account? Log in <a href="./login">here</a>
          </p>
        : <p>
        No account? Sign up <a href="./signup">here</a>
      </p>}
        
      </InputContainer>
      <ImageContainer>
        <h1>image</h1>
      </ImageContainer>
    </div>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  padding: 5rem 5rem 7rem;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 45px;
  }
  .input-container {
    width: 45%;
    input {
      width: 50%;
    }
  }
  .input-gap {
    margin-right: 1rem;
  }
`;

const ImageContainer = styled.div`
  width: 45%;
  background-color: var(--main-green);
`;

const Icon = styled.img`
  width: 200px;
`;
export default SignupPage;
