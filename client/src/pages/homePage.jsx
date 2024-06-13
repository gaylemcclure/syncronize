import React, { useState } from "react";
import HomeNav from "../components/nav/homeNav";
import SideNav from "../components/nav/sideNav";
import styled from "styled-components";
import ProjectTable from "../components/projectTable";
import ProjectTitleIcon from "../components/menus/projectTitleIcon";

const HomePage = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [buttonMenu, setButtonMenu] = useState(false);
  const [titleMenu, setTitleMenu] = useState(false);
  const [projectName, setProjectName] = useState("Project name");
  const [projectDesc, setProjectDesc] = useState("Project description");

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleButtonMenu = () => {
    setButtonMenu(!buttonMenu);
  };


  const handleClassname = () => {
    if (openMenu && buttonMenu) {
      return "main-page open-menu move-back";
    } else if (openMenu && !buttonMenu) {
      return "main-page open-menu";
    } else {
      return "main-page close-menu";
    }
  };

  return (
    <>
      <HomeNav />
      <div className="flex-row">
        <SideNav openMenu={openMenu} menuFunction={handleOpenMenu} buttonMenu={buttonMenu} buttonFunction={handleButtonMenu} setButtonMenu={setButtonMenu} />
        <PageContainer className={handleClassname()}>
            <div className="flex-row align">
          <h3 className="title">{projectName} </h3>
          <ProjectTitleIcon />
          </div>
          <p>{projectDesc}</p>
          <div className="project-menu flex-row">
            <button>List</button>
            <button>Table</button>
            <button>Dashboard</button>
            <button>+</button>
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

  .title {

  }
`;
export default HomePage;
