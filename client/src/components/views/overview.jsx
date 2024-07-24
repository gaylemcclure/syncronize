import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useUserContext } from "../../utils/contexts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { QUERY_PROJECT_TASKS, QUERY_COMPLETED_TASKS } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import dayjs from "dayjs";

const Overview = () => {
  const { userData } = useUserContext();
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasksArr, setAllTasksArr] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  //Check that the user & projects are loaded before rendering
  useEffect(() => {
    if (userData.projects) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [userData]);

  //use projectId to query the project data
  const [queryTasks, { data }] = useLazyQuery(QUERY_PROJECT_TASKS);
  const [completedTasks] = useLazyQuery(QUERY_COMPLETED_TASKS);

  useEffect(() => {
    if (isLoaded) {
      const getTasks = async () => {
        let taskArr = [];
        let allTasks = []
        userData.projects.map(async (proj) => {
          const data = await queryTasks({ variables: { projectId: proj._id } });
          const comData = await completedTasks({ variables: { projectId: proj._id } });

          taskArr.push({
            projectId: proj._id,
            projectName: proj.projectName,
            taskLength: data.data.projectTasks.length,
            completedLength: comData.data.completedTasks.length,
            tasks: data.data.projectTasks,
            dueDate: proj.dueDate
          });

          allTasks.push(data.data.projectTasks)
        });
        console.log(allTasks)
        setTasks(taskArr);
        setAllTasksArr(allTasks)
      };

      getTasks();
    }
  }, [isLoaded]);

  useEffect(() => {
    let taskArr = [];
    if (allTasksArr.length > 0) {
      allTasksArr.map((task) => {
        taskArr.push(task)
      })
      console.log(taskArr)
      setAllTasks(taskArr)
    }
  }, [allTasksArr])


  const bull = (
    <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
      •
    </Box>
  );

  return (
    <>
      {isLoaded && (
        <>
          <div className="flex flex-row gap-2">
            {/*Creating the first project column */}
            <Card sx={{ minWidth: 275, width: "30%" }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, textTransform: 'uppercase', fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Projects
                </Typography>
                <ul className="overview-project-title">
                  {tasks.map((proj) => (
                    <div key={proj.projectId} className="flex flex-row align">
                      <AccountTreeIcon />
                      <li className="overview-project align">{proj.projectName}</li>
                    </div>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/*Creating the uue date column */}
            <Card sx={{ minWidth: 275, width: "30%" }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, textTransform: 'uppercase', fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Due date
                </Typography>
                <ul>
                  {tasks.map((proj) => {
                    const date = dayjs(proj.dueDate).format('DD/MM/YYYY')
                    return  <div key={proj.projectId} className="flex flex-row align justify overview-date">
                      {date}
                    </div>
})}
                </ul>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            {/*Creating the countdown column */}
            <Card sx={{ minWidth: 275, width: "30%" }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, textTransform: 'uppercase', fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Countdown
                </Typography>
                <ul>
                  {tasks.map((proj) => {
                    const today = dayjs();
                    const due = dayjs(proj.dueDate)
                    const difference = due.diff(today, 'day');
                    if (difference > 0) {
                      return <div key={proj.projectId} className="flex flex-row align overview-date">
                      <div className=" overview-countdown upcoming">{difference} days remaining</div>
                    </div>
                    } else {
                      return <div key={proj.projectId} className="flex flex-row align overview-date">
                      <div className=" overview-countdown past-date">{difference} days remaining</div>
                    </div>
                    }

})}
                </ul>
              </CardContent>
            </Card>

            {/*Creating the progress column */}
            <Card sx={{ minWidth: 275, width: "5%" }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, textTransform: 'uppercase', fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Progress
                </Typography>
                <ul>
                  {tasks.map((proj) => (
                    <div key={proj.projectId} className="flex flex-row align">
                      <Gauge
                        sx={(theme) => ({
                          marginLeft: "auto",
                          [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 14,
                          },
                          [`& .${gaugeClasses.valueArc}`]: {
                            fill: "var(--main-green)",
                          },
                        })}
                        width={75}
                        height={75}
                        value={proj.completedLength}
                        valueMax={proj.taskLength}
                        startAngle={-110}
                        endAngle={110}
                        text={({ value, valueMax }) => `${value} / ${valueMax}`}
                      />
                      <div className="overview-gauge"></div>
                    </div>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>

          {/*Display all current task by due date */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <Typography sx={{ fontSize: 16, textTransform: 'uppercase', fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Upcoming tasks
                </Typography>
                <ul>
                  {allTasks.length === 0 && (
                    <p>No tasks yet</p>
                  )}
                                    {allTasks.length > 0 && (
                    <>
                    {allTasks.map((task) => (
                      <li key="something">something</li>
                    ))}
                    </>
                  )}

                </ul>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
    // <div>
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
    // </div>
  );
};

// const OverviewWrapper = styled.div`
//   margin-top: 1.5rem;
// `;
// const MainCard = styled.div`
//   border: 1px solid var(--gray-border);
//   border-radius: 12px;
//   padding: 1rem 2rem;
//   margin: 1rem;
//   h3 {
//     font-size: 20px;
//     font-weight: 600;
//     margin-bottom: 1rem;
//   }
// `;

export default Overview;
