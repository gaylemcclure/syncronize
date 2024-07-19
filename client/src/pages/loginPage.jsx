import { useState } from "react";
import styled from "styled-components";
import icon from "../assets/images/sync-icon.png";
import pageImg from "../assets/images/management.png";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";


const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [login, { error, data }] = useMutation(LOGIN_USER, { variables: { email, password }});

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login();
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-row full-height">
        <InputContainer>
          <Icon src={icon} alt="syncronize icon" />
          <h2>Welcome back to Sycronize</h2>
          <form className="flex-col form" onSubmit={handleLogin}>
            <input placeholder="Email" type="email" value={email} onInput={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
            <button className="signup-button" id="signup-button" type="submit">
              Log in
            </button>
          </form>
          <p>
            No account? Sign up <a href="./signup">here</a>
          </p>

          {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
        </InputContainer>
        <ImageContainer>
          <img src={pageImg} alt="drawing of many hands working on written and computer tasks" />
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