import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../assets/styles/homepage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableView from "../components/views/tableView";
import { useOpenContext } from "../utils/openContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_PROJECT, QUERY_PROJECT_TASKS, QUERY_COMPLETED_TASKS, QUERY_TASKS } from "../utils/queries";
import { useUserContext } from "../utils/contexts";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import dayjs from "dayjs";
import TaskIcon from "@mui/icons-material/Task";

const HomeTabs = ({ one, two, allTasks }) => {
  const [value, setValue] = useState(0);
  const { open } = useOpenContext();
  const { userData, setUserData } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (userData.projects) {
      setIsLoaded(true);
    }
  }, [userData]);


  const checkTaskLength = (projectId) => {
    const allProj = userData.projects;
    const currentProj = allProj.filter((proj) => proj._id === projectId);
    let completed = 0
    let allTaskLength = 0
    if (currentProj[0].tasks !== undefined) {
    const completedTasks = currentProj[0].tasks.filter((task) => task.status === "Completed")
      allTaskLength = currentProj[0].tasks.length;
      completed = completedTasks.length;
    }
    return {allTaskLength, completed}
  }


  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`home-tabs-${index}`} aria-labelledby={`home-tabs-${index}`} {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const tabProps = (index) => {
    return {
      id: `home-tabs-${index}`,
      "aria-controls": `home-tabs-${index}`,
    };
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {!isLoaded && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {isLoaded && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", flexDirection: "row" }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label={one} {...tabProps(0)} />
              <Tab label={two} {...tabProps(1)} />
              {/* <Tab label={three} {...tabProps(2)} /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {/* {one === "Overview" ? <Overview projectData={userData.projects} /> : <ProjectTable projectData={userData.projects} />} */}
            <>
          <div className="flex flex-row gap-2">
            {/*Creating the first project column */}
            <Card sx={{ minWidth: 275, width: "30%" }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, textTransform: "uppercase", fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Projects
                </Typography>
                <ul className="overview-project-title">
                  {userData.projects.map((proj) => (
                    <div key={proj._id} className="flex flex-row align">
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
                <Typography sx={{ fontSize: 16, textTransform: "uppercase", fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Due date
                </Typography>
                <ul>
                  {userData.projects.map((proj) => {
                    const date = dayjs(proj.dueDate).format("DD/MM/YYYY");
                    return (
                      <div key={proj._id} className="flex flex-row align justify overview-date">
                        {date}
                      </div>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
            {/*Creating the countdown column */}
            <Card sx={{ minWidth: 275, width: "30%" }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, textTransform: "uppercase", fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Countdown
                </Typography>
                <ul>
                  {userData.projects.map((proj) => {
                    const today = dayjs();
                    const due = dayjs(proj.dueDate);
                    const difference = due.diff(today, "day");
                    return (
                          <div key={proj._id} className="flex flex-row align overview-date">
                            <div className={difference > 0 ? "overview-countdown upcoming" : "overview-countdown past-date"}>{difference} days remaining</div>
                          </div>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            {/*Creating the progress column */}
            <Card sx={{ minWidth: 275, width: "5%" }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, textTransform: "uppercase", fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Progress
                </Typography>
                <ul>
                  {userData.projects.map((proj) => {
                    const tLength = checkTaskLength(proj._id);
                return (
                    <div key={proj._id} className="flex flex-row align">
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
                        value={tLength.completed}
                        valueMax={tLength.allTaskLength}
                        startAngle={-110}
                        endAngle={110}
                        text={({ value, valueMax }) => `${value} / ${valueMax}`}
                      />
                      <div className="overview-gauge"></div>
                    </div>
                )
                    })}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/*Display all current task by due date */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 16, textTransform: "uppercase", fontWeight: 600 }} color="text.secondary" gutterBottom>
                Upcoming tasks
              </Typography>
              <ul>
                {allTasks.length === 0 && <p>No tasks yet</p>}
                {allTasks.length > 0 && (
                  <ul className="overview-project-title">
                    {allTasks.map((task) => {
                      const date = dayjs(task.dueDate).format("DD/MM/YYYY");
                      const today = dayjs();
                      const due = dayjs(task.dueDate);
                      const difference = due.diff(today, "day");
                      return (
                        <div key={task._id} className="flex flex-row align">
                          <TaskIcon />
                          <li className="overview-task align">
                            <div>{task.title}</div>
                            <div>{date}</div>
                            {difference > 0 ? (
                              <div key={task._id} className="flex flex-row align overview-date">
                                <div className=" overview-countdown upcoming">{difference} days remaining</div>
                              </div>
                            ) : (
                              <div key={task._id} className="flex flex-row align overview-date">
                                <div className=" overview-countdown past-date">{difference} days remaining</div>
                              </div>
                            )}
                            {task.status === "Not started" && (
                              <div className="flex flex-row align overview-date">
                                <div className="overview-countdown not-started">{task.status}</div>
                              </div>
                            )}
                            {task.status === "In progress" && (
                              <div className="flex flex-row align overview-date">
                                <div className="overview-countdown progress">{task.status}</div>
                              </div>
                            )}
                            {task.status === "Stuck" && (
                              <div className="flex flex-row align overview-date">
                                <div className="overview-countdown stuck">{task.status}</div>
                              </div>
                            )}
                            {task.status === "Completed" && (
                              <div className="flex flex-row align overview-date">
                                <div className="overview-countdown completed">{task.status}</div>
                              </div>
                            )}
                            {task.priority === "Low" && (
                              <div className="flex flex-row align overview-date">
                                <div className="overview-countdown same-width low">{task.priority}</div>
                              </div>
                            )}
                            {task.priority === "Medium" && (
                              <div className="flex flex-row align overview-date">
                                <div className="overview-countdown same-width medium">{task.priority}</div>
                              </div>
                            )}
                            {task.priority === "High" && (
                              <div className="flex flex-row align overview-date">
                                <div className="overview-countdown same-width high">{task.priority}</div>
                              </div>
                            )}
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                )}
              </ul>
            </CardContent>
          </Card>
        </>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TableView />
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={2}>
            <ListView />
          </CustomTabPanel> */}
        </>
      )}
    </Box>
  );
};

export default HomeTabs;
