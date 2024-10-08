import { useState, useEffect } from "react";
import styled from "styled-components";
import icon from "../assets/images/sync-icon.png";
import pageImg from "../assets/images/management.png";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_EXISTING_USER_TO_PROJECT } from "../utils/mutations";
import Auth from "../utils/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [refer, setRefer] = useState(false);
  const theme = useTheme();
  const pageTheme = theme.palette.mode;

  const [login, { error, data }] = useMutation(LOGIN_USER, { variables: { email, password } });
  const [addExistingUserToProject] = useMutation(ADD_EXISTING_USER_TO_PROJECT, { variables: { email, projectId, userToken } });

  useEffect(() => {
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const refer = urlParams.get("refer");
    const project = urlParams.get("project");
    const referEmail = urlParams.get("email");
    const user = urlParams.get("usertoken");
    if (refer === "existing") {
      console.log(userToken)
      setRefer(true);
      if (referEmail) {
        setEmail(referEmail);
      }
      if (project) {
        setProjectId(project);
      }
      if (user) {
        setUserToken(user);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const search = window.location.search;
    try {
      if (refer) {
        const { data } = await addExistingUserToProject();
        console.log(data)
        Auth.login(data.addExistingUserToProject.token, search);
      } else {
        const { data } = await login();
        Auth.login(data.login.token, search);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-row full-height">
      <InputContainer className={pageTheme === "dark" ? "dark-bg" : "light-bg"}>
        <Icon src={icon} alt="syncronize icon" />
        <h2 className={pageTheme === "dark" ? "white-text" : "dark-text"}>Welcome back to Sycronize</h2>
        <form className="flex-col form" onSubmit={handleLogin}>
          <TextField
            className={pageTheme === "dark" ? "white-text" : "black-text"}
            sx={{ borderColor: pageTheme === "dark" ? "var(--input-border" : "red" }}
            size="small"
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
            Log in
          </Button>
        </form>
        <p className={pageTheme === "dark" ? "white-text" : "dark-text"}>
          No account? Sign up{" "}
          <a className={pageTheme === "dark" ? "white-text link-text" : "dark-text link-text"} href="./signup">
            here
          </a>
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
