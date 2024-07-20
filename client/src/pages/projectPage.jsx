import { useState, useEffect } from "react";
import HomeNav from "../components/nav/homeNav";
import SideNav from "../components/nav/sideNav";
import styled from "styled-components";
import ProjectTable from "../components/projectTable";
import ProjectTitleIcon from "../components/menus/projectTitleIcon";
import { useUserContext } from "../utils/contexts";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../utils/queries";

const ProjectPage = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [projectData, setProjectData] = useState({});
  const [innerNav, setInnerNav] = useState("list");
  const { userData } = useUserContext();

  //Get the project id from url
  let projectId = "";
  const paramString = window.location.pathname;
  const searchParams = new URLSearchParams(paramString);
  searchParams.forEach((value, key) => {
    projectId = value;
  });
  //use projectId to query the project data
  const { data } = useQuery(QUERY_PROJECT, { variables: { _id: projectId } });

  useEffect(() => {
    const getProject = async () => {
      try {
        const proj = data?.proj;
        setProjectData(proj);
      } catch (err) {
        console.error(err);
      }
    };
    getProject();
  });

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleInnerNav = (e) => {
    setInnerNav(e.target.id);
  };

  return (
    <>
      <HomeNav user={userData} />
      <div className="flex-row">
        <SideNav menu={openMenu} setMenu={handleOpenMenu} user={userData} />
        <PageContainer className={openMenu ? "main-page open-menu" : "main-page close-menu"}>
          <div className="flex-row align">
            {projectData && <h3 className="title">{projectData.projectName}</h3>}
            <ProjectTitleIcon />
          </div>
          {projectData && <p>{projectData.description}</p>}
          <div className="project-menu flex-row">
            <button id="overview" onClick={(e) => handleInnerNav(e)} className={innerNav === "list" ? "project-menu-button nav-underline" : "project-menu-button"}>
              <span className="material-symbols-outlined">dataset</span>List
            </button>
            <button id="table" onClick={(e) => handleInnerNav(e)} className={innerNav === "table" ? "project-menu-button nav-underline" : "project-menu-button"}>
              <span className="material-symbols-outlined">table_rows</span>Table
            </button>
            <button id="list" onClick={(e) => handleInnerNav(e)} className={innerNav === "board" ? "project-menu-button nav-underline" : "project-menu-button"}>
              <span className="material-symbols-outlined">list</span>Board
            </button>
            <button id="list" onClick={(e) => handleInnerNav(e)} className={innerNav === "dashboard" ? "project-menu-button nav-underline" : "project-menu-button"}>
              <span className="material-symbols-outlined">list</span>Dashboard
            </button>
            <button className="plus-button">+</button>
          </div>
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
        </PageContainer>
      </div>
    </>
  );
};

const PageContainer = styled.div`
  position: fixed;
  top: 4.5rem;
  height: 93%;
  padding: 1rem 2rem;
  overflow: auto;

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
export default ProjectPage;
