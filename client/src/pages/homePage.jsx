import { useState, useEffect } from "react";
import HomeNav from "../components/nav/homeNav";
import SideNav from "../components/nav/sideNav";
import styled from "styled-components";
import Overview from "../components/views/overview";
import TableView from "../components/views/tableView";
import ListView from "../components/views/listView";
import { ADD_PROJECT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useUserContext } from "../utils/contexts";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [innerNav, setInnerNav] = useState("overview");
  const { userData, setUserData } = useUserContext();
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(loggedIn)
  console.log(userData)

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          setLoggedIn(false);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    isLoggedIn();
  }, []);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleInnerNav = (e) => {
    setInnerNav(e.target.id);
  };

  return (
    <>
      {!loggedIn && <h1>You are not logged in. Redirecting to login page ...</h1>}
      {loggedIn && (
        <>
          <HomeNav user={userData} />
          <div className="flex-row">
            <SideNav menu={openMenu} setMenu={handleOpenMenu} />
            <PageContainer className={openMenu ? "main-page open-menu" : "main-page close-menu"}>
              <PageHeader>
                <div className={openMenu ? "workspace-icon space" : "workspace-icon"}>{userData.initials}</div>
                <h4 className="workspace-name">{openMenu ? userData.workspaceName : ""}</h4>
              </PageHeader>
              <PageWrapper>
                <div className="project-menu flex-row">
                  <button id="overview" onClick={(e) => handleInnerNav(e)} className={innerNav === "overview" ? "project-menu-button nav-underline" : "project-menu-button"}>
                    <span className="material-symbols-outlined">dataset</span>Overview
                  </button>
                  <button id="table" onClick={(e) => handleInnerNav(e)} className={innerNav === "table" ? "project-menu-button nav-underline" : "project-menu-button"}>
                    <span className="material-symbols-outlined">table_rows</span>Table
                  </button>
                  <button id="list" onClick={(e) => handleInnerNav(e)} className={innerNav === "list" ? "project-menu-button nav-underline" : "project-menu-button"}>
                    <span className="material-symbols-outlined">list</span>List
                  </button>
                  <button className="plus-button">+</button>
                </div>
                {userData && (
                  <>
                    {innerNav === "overview" && <Overview user={userData} />}
                    {innerNav === "table" && <TableView user={userData} />}
                    {innerNav === "list" && <ListView user={userData} />}
                  </>
                )}
              </PageWrapper>
            </PageContainer>
          </div>
        </>
      )}
    </>
  );
};

const PageContainer = styled.div`
  position: fixed;
  top: 4.5rem;
  height: 93%;
  overflow: auto;
`;

const PageHeader = styled.div`
  padding: 0.5rem 2rem;
  background-color: var(--light-gray);
  align-items: center;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--gray-border);
  .workspace-icon {
    background-color: #550080;
    height: 30px;
    width: 30px;
    color: var(--ws-gray-text);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }
`;

const PageWrapper = styled.div`
  padding: 1.5rem 2rem;
  .project-menu-button {
    display: flex;
    align-items: center;
    padding: 0 1rem 0.5rem;
    border-right: 1px solid var(--gray-border);
  }
  .material-symbols-outlined {
    padding-right: 0.5rem;
  }
  .plus-button {
    padding-left: 1rem;
  }
`;
export default HomePage;
