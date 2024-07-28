/* eslint-disable react/jsx-key */
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { UPDATE_TASK, DELETE_TASK } from "../utils/mutations";
import { QUERY_PROJECT_TASKS, QUERY_USER, QUERY_FILTERS } from "../utils/queries";
import { useMutation, useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";
import EditTaskModal from "./modals/editTaskModal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import { useUserContext } from "../utils/contexts";

//Create the open task button within title cell
const RenderTaskButton = (props) => {
  return (
    <div className="flex-row justify align">
      <div>{props.value}</div>
      <EditTaskModal id={props.id} />
    </div>
  );
};

const ProjectTable = ({ projectData, projectId }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [age, setAge] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [nonFilterRows, setNonFilterRows] = useState([]);
  const { userData, setUserData } = useUserContext();

  const theme = useTheme();
  let taskId = "";

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [queryFilters] = useLazyQuery(QUERY_FILTERS);


  //Get the tasks from db and save into rows state
  useEffect(() => {
    if (projectData[0].tasks) {
      const handleCreateRows = () => {
        let taskArr = [];
        projectData[0].tasks.map( (task) => {

            //Get the assigned users initials for avatar
            taskArr.push({
              id: task._id,
              title: task.title,
              status: task.status,
              dueDate: task.dueDate,
              assignee: task.assignedTo.initials,
              description: task.description,
              priority: task.priority,
            });
        });
        setRows(taskArr);
      };
      handleCreateRows();
    }
  }, [projectData]);


  //Cancel the editing function
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  //Start inline edit
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  //Save updates the row
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  //Delete a task
  const handleDeleteClick = (id) => async () => {
    setRows(rows.filter((row) => row.id !== id));
    try {
      const { data } = await deleteTask({
        variables: {
          _id: id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  //Cancel saving the changes
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  //Process to update the row & save to db
  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };

    taskId = updatedRow.id;

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    try {
      const assUser = projectData[0].users.filter((use) => use.initials === updatedRow.assignee);
      const { data } = await updateTask({
        variables: {
          _id: taskId,
          title: updatedRow.title,
          description: updatedRow.description,
          dueDate: updatedRow.dueDate,
          status: updatedRow.status,
          priority: updatedRow.priority,
          assignedTo: assUser[0]._id,
        },
      });
    } catch (err) {
      console.error(err);
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  //Generate an array of users for the assignedTo field dropdown edit
  const userOptions = () => {
    const options = [];
    projectData[0].users.map((user) => {
      options.push({ code: user.initials, name: user.first + " " + user.last });
    });
    return options;
  };

  //Create the columns
  const columns = [
    { field: "modal", headerName: "", flex: 0.2, editable: false, renderCell: (e) => RenderTaskButton(e) },
    { field: "title", headerName: "Title", flex: 1, editable: true },
    {
      field: "assignee",
      headerName: "Assigned to",
      flex: 0.5,
      editable: true,
      getOptionValue: (value) => value.code,
      getOptionLabel: (value) => value.name,
      type: "singleSelect",
      valueOptions: () => userOptions(),
      renderCell: (params) => {
        return <Avatar sx={{ width: 30, height: 30, fontSize: 14, marginRight: 2, backgroundColor: "var(--main-green)" }}>{params.value}</Avatar>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Not started", "In progress", "Stuck", "Completed"],
    },
    {
      field: "dueDate",
      headerName: "Due date",
      flex: 0.5,
      editable: true,
      type: "date",
      valueGetter: (value) => {
        return new Date(value);
      },
    },
    { field: "priority", headerName: "Priority", flex: 0.5, editable: true, type: "singleSelect", valueOptions: ["-", "Low", "Medium", "High"] },
    { field: "description", headerName: "Description", flex: 2, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        //If already editing, change buttons to save/cancel
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
          ];
        }
        //Edit and delete buttons show
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />,
        ];
      },
    },
  ];


  const handleStatusSelect = async () => {
    if (!isFilter) {
      console.log(projectData)
    const tasksList = projectData[0].tasks;
    console.log(tasksList)
    setNonFilterRows(rows)
    let newFilter = [];
    const arr = [];
    if (statusFilter === "" && priorityFilter !== "") {
      newFilter = tasksList.filter((task) => task.priority === priorityFilter);

    } else if (priorityFilter === "" && statusFilter !== "") {
      newFilter = tasksList.filter((task) => task.status === statusFilter);
    } else if (statusFilter !== "" && priorityFilter !== "") {
      newFilter = tasksList.filter((task) => task.priority === priorityFilter && task.status === statusFilter);
    } 

    newFilter.map((tas) => {
      arr.push({
          id: tas._id,
          title: tas.title,
          description: tas.description,
          dueDate: tas.dueDate,
          status: tas.status,
          priority: tas.priority,
          assignedTo: "FD",
      })
    });

    setRows(arr)
    setIsFilter(true)
  } else if (isFilter) {
    setStatusFilter("")
    setPriorityFilter("")
    setRows(nonFilterRows)
    setIsFilter(false)
  }
  };


  return (
    <div style={{ width: "100%", height: "800px" }}>
      <Box sx={{ minWidth: 120, display: "flex", flexDirection: "row", paddingBottom: '1rem' }}>
        <div className="flex-row">
          <FormControl fullWidth sx={{ display: "flex", flexDirection: "row" }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={statusFilter}
              label="Status-select"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: "15rem", height: "48px" }}
            >
              <MenuItem value={"Not started"}>Not started</MenuItem>
              <MenuItem value={"In progress"}>In progress</MenuItem>
              <MenuItem value={"Stuck"}>Stuck</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex-row">
          <FormControl fullWidth sx={{ display: "flex", flexDirection: "row", marginLeft: '1rem' }}>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={priorityFilter}
              label="Priority-select"
              onChange={(e) => setPriorityFilter(e.target.value)}
              sx={{ width: "15rem", height: "48px" }}
            >
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleStatusSelect}>
            {isFilter ? <FilterAltOffIcon sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}/> : <FilterAltIcon sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}/> }
          </Button>
        </div>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "skeleton",
          },
        }}
      />
    </div>
  );
};

export default ProjectTable;
