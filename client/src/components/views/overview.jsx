import { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../utils/contexts";

const Overview = () => {
  const { userData } = useUserContext();
  // const checkUser = Object.keys(userData).length;

  // console.log(userData.projects.length);

  return (
    <></>
    // <OverviewWrapper>
    //   {checkUser !== 0 && (
    //     <>
    //       {userData.projects.length === 0 && (
    //         <div className="overview-card-wrapper flex-row">
    //           <MainCard className="full">
    //             <h3>No projects yet! Add a new project to begin.</h3>
    //           </MainCard>
    //         </div>
    //       )}

    //       {userData.projects.length !== 0 && (
    //         <div className="overview-card-wrapper flex-row">
    //           <MainCard className="third">
    //             <ul>
    //               <li>Task 1</li>
    //               <li>Task 2</li>
    //               <li>Task 3</li>
    //             </ul>
    //           </MainCard>

    //           <MainCard className="third">
    //             {userData.projects.length === 0 && (
    //               <>
    //                 <h3>Docs</h3>
    //                 <p>No docs yet</p>
    //               </>
    //             )}
    //             <h3>Docs</h3>
    //             <ul>
    //               <li>Task 1</li>
    //               <li>Task 2</li>
    //               <li>Task 3</li>
    //             </ul>
    //           </MainCard>

    //           <MainCard className="third">
    //             {userData.projects.length === 0 && (
    //               <>
    //                 <h3>Uploads</h3>
    //                 <p>No uploads yet</p>
    //               </>
    //             )}
    //             <h3>Uploads</h3>
    //             <ul>
    //               <li>Task 1</li>
    //               <li>Task 2</li>
    //               <li>Task 3</li>
    //             </ul>
    //           </MainCard>

    //           <MainCard className="full">
    //             {userData.projects.length === 0 && (
    //               <>
    //                 <h3>Uploads</h3>
    //                 <p>No uploads yet</p>
    //               </>
    //             )}
    //             <h3>Uploads</h3>
    //             <ul>
    //               <li>Task 1</li>
    //               <li>Task 2</li>
    //               <li>Task 3</li>
    //             </ul>
    //           </MainCard>
    //         </div>
    //       )}
    //     </>
    //   )}
    // </OverviewWrapper>
  );
};

const OverviewWrapper = styled.div`
  margin-top: 1.5rem;
`;
const MainCard = styled.div`
  border: 1px solid var(--gray-border);
  border-radius: 12px;
  padding: 1rem 2rem;
  margin: 1rem;
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

export default Overview;
