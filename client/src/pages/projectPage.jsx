import { useState, useEffect } from "react";
import HomeNav from "../components/nav/homeNav";
import SideNav from "../components/nav/sideNav";
import styled from "styled-components";
import ProjectTable from "../components/projectTable";
import ProjectTitleIcon from "../components/menus/projectTitleIcon";

const ProjectPage = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(true);
  const [projectData, setProjectData] = useState({});
  const [innerNav, setInnerNav] = useState("list");


  let projectId = ""
  const paramString = window.location.pathname;
  const searchParams = new URLSearchParams(paramString)
  searchParams.forEach((value, key) => {
    projectId = value
  });


    //Get the project data from db
    useEffect(() => {
      const testUrl = `http://localhost:5001/api/project/${projectId}`;
      const getSingleProject = async () => {
      await fetch(testUrl)
        .then(function (response) {
          if (!response.ok) {
            alert('Error message');
          } else {
            return response.json()
          }
        }).then(function (data) {
          setProjectData(data)
        })
      }
      getSingleProject()
    }, [projectId])


    console.log(projectData)
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };


  const handleInnerNav = (e) => {
    setInnerNav(e.target.id)
  }





  return (
    <>
      <HomeNav user={user} />
      <div className="flex-row">
        <SideNav menu={openMenu} setMenu={handleOpenMenu} user={user} />
        <PageContainer className={openMenu ? "main-page open-menu" : "main-page close-menu" }>
            <div className="flex-row align">
          {projectData && (<h3 className="title">{projectData.projectName}</h3>)}
          <ProjectTitleIcon />
          </div>
          {projectData && (<p>{projectData.description}</p>)}
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
