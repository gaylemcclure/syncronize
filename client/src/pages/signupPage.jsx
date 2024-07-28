import { useEffect, useState } from "react";
import styled from "styled-components";
import icon from "../assets/images/sync-icon.png";
import pageImg from "../assets/images/management.png";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignupPage = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initials, setInitials] = useState("");

  const [addUser, { error }] = useMutation(ADD_USER, { variables: { first, last, email, password, initials } });

  //Set the users initials when first & last name are entered
  useEffect(() => {
    if (first && last) {
      const firstInitial = first.charAt(0);
      const secondInitial = last.charAt(0);
      const ints = `${firstInitial}${secondInitial}`;
      const upper = ints.toUpperCase();
      setInitials(upper);
    }
  }, [first, last]);

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
    <div className="flex-row full-height">
      <>
        <InputContainer>
          <Icon src={icon} alt="syncronize icon" />
          <h2>Welcome to Sycronize</h2>

          <form className="flex-col form" onSubmit={handleSignup}>
            <TextField size="small" label="First name" id="first-name" value={first} onInput={(e) => setFirst(e.target.value)} />
            <TextField sx={{ marginTop: "1rem" }} label="Last name" size="small" id="last" value={last} onInput={(e) => setLast(e.target.value)} />

            <TextField
              size="small"
              sx={{ marginTop: "1rem" }}
              label="Email"
              id="email"
              type="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ marginTop: "1rem" }}
              label="Password"
              size="small"
              type="password"
              id="password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
            <Button sx={{ backgroundColor: "var(--main-green)", marginTop: "1rem" }} className="signup-button" id="signup-button" type="submit">
              Sign up
            </Button>
          </form>

          <p>
            Already have an account? Log in <a href="./login">here</a>
          </p>

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
  .half-input {
    width: 50%;
  }
  .input-gap {
    margin-right: 1rem;
  }
  .form {
    width: 45%;
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
