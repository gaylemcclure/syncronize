import { useEffect, useState } from "react";
import styled from "styled-components";
import icon from "../assets/images/sync-icon.png";
import pageImg from "../assets/images/management.png";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";


const SignupPage = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initials, setInitials] = useState("");

  const [addUser, { error }] = useMutation(ADD_USER, { variables: {first, last, email, password, initials}});


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

  //Set the users initials when first & last name are entered
  useEffect(() => {
    if (first && last) {
      const firstInitial = first.charAt(0);
      const secondInitial = last.charAt(0);
      const ints = `${firstInitial}${secondInitial}`;
      const upper = ints.toUpperCase();
      setInitials(upper)
    }
  }, [first, last])


  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser();
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-row">
        <>
          <InputContainer>
            <Icon src={icon} alt="syncronize icon" />
            {pathName === "/signup" ? <SignupText /> : <LoginText />}
            <form onSubmit={handleSignup}>
              {pathName === "/signup" && (
                <div className="flex-row input-container">
                  <input placeholder="First name" className="input-gap" value={first} onInput={(e) => setFirst(e.target.value)} />
                  <input placeholder="Last name" value={last} onInput={(e) => setLast(e.target.value)} />
                </div>
              )}
              <input placeholder="Email" type="email" value={email} onInput={(e) => setEmail(e.target.value)} />
              <input placeholder="Password" type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
              <button className="signup-button" id="signup-button" type="submit">
                Sign up
              </button>
            </form>

            {pathName === "/signup" ? (
              <p>
                Already have an account? Log in <a href="./login">here</a>
              </p>
            ) : (
              <p>
                No account? Sign up <a href="./signup">here</a>
              </p>
            )}

            {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
          </InputContainer>
          <ImageContainer>
            <img src={pageImg} alt="drawing of many hands working on written and computer tasks" />
          </ImageContainer>
        </>
      
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
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
    max-width: 65%;
  }
  button {
    min-height: 40px;
  }
`;

const Icon = styled.img`
  width: 200px;
`;
export default SignupPage;
