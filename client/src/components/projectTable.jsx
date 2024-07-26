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
import { QUERY_PROJECT_TASKS, QUERY_USER } from "../utils/queries";
import { useMutation, useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";
import EditTaskModal from "./modals/editTaskModal";

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

  let taskId = "";
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  //Get the tasks from db and save into rows state
  useEffect(() => {
    if (projectData.tasks) {
      const handleCreateRows = () => {
        let taskArr = [];
        projectData.tasks.map(async (task) => {
          try {
            //Get the assigned users initials for avatar
            const users = projectData.users;
            const assignedTo = users.filter((user) => user._id === task.assignedTo._id);

            // const assignedToInitials = assignedTo[0].initials;
            //Push all the items into array to save to state
            taskArr.push({
              id: task._id,
              title: task.title,
              status: task.status,
              dueDate: task.dueDate,
              assignee: assignedTo[0].initials,
              description: task.description,
              priority: task.priority,
            });
          } catch (err) {
            console.error(err);
          }
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
      const assUser = projectData.users.filter((use) => use.initials === updatedRow.assignee);
      const { data } = await updateTask({
        variables: {
          _id: taskId,
          title: updatedRow.title,
          description: updatedRow.description,
          dueDate: updatedRow.dueDate,
          status: updatedRow.status,
          priority: updatedRow.priority,
          assignedTo: assUser[0]._id
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
    projectData.users.map((user) => {
      options.push({ code: user.initials, name: user.first + " " + user.last });
    });
    return options;
  };

  //Create the columns
  const columns = [
    { field: "modal", headerName: "", flex: 0.2, editable: false, renderCell: (e) => RenderTaskButton(e)},
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
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
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

  return (
    <div style={{ width: "100%", height: '800px'}}>
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
            variant: 'circular-progress',
            noRowsVariant: 'skeleton'
          }
        }}
      />
    </div>
  );
};

export default ProjectTable;
