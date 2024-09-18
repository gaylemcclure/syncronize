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
import EditUserModal from "./modals/editUserModal";
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
const RenderEditUserModal = (props) => {
  console.log(props)
  return (
    <div className="flex-row justify align">
      {/* <div>{props.value}</div> */}
      <EditUserModal id={props.id} />
    </div>
  );
};

const UserTable = ({ searchData, users, projects }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
//   const [priorityFilter, setPriorityFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [isFilter, setIsFilter] = useState(false);
  const [nonFilterRows, setNonFilterRows] = useState([]);
  const { userData, setUserData } = useUserContext();


  const theme = useTheme();
  let taskId = "";

//   const [updateTask] = useMutation(UPDATE_TASK);
//   const [deleteTask] = useMutation(DELETE_TASK);
//   const [queryFilters] = useLazyQuery(QUERY_FILTERS);


//Users can have multiple projects
//Max number of users

  //Get the users from the db and save into rows state
  useEffect(() => {
    if (users) {
      const handleCreateRows = () => {
       const updatedUsers = users.map((user) => {
        return {
          ...user,
          name: user.first + " " + user.last,
          id: user._id
        }
        })
        setRows(updatedUsers);
      };
      handleCreateRows();
    }
  }, [users]);


//   //Cancel the editing function
//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   //Start inline edit
//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   //Save updates the row
//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };

//   //Delete a task
//   const handleDeleteClick = (id) => async () => {
//     setRows(rows.filter((row) => row.id !== id));
//     try {
//       const { data } = await deleteTask({
//         variables: {
//           _id: id,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   //Cancel saving the changes
//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//   //Process to update the row & save to db
//   const processRowUpdate = async (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };

//     taskId = updatedRow.id;

//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     try {
//       const assUser = projectData[0].users.filter((use) => use.initials === updatedRow.assignee);
//       const { data } = await updateTask({
//         variables: {
//           _id: taskId,
//           title: updatedRow.title,
//           description: updatedRow.description,
//           dueDate: updatedRow.dueDate,
//           status: updatedRow.status,
//           priority: updatedRow.priority,
//           assignedTo: assUser[0]._id,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//     return updatedRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

const ProjComponent = (params) => {
  console.log(params.params.value)
  return (
    <div className="project-wrapper flex flex-row">
      {params.params.value.map((proj) => {
        return <p className="project-icon" key={proj._id}>{proj.projectName}</p>
      })}
    </div>
  )

}


//   //Create the columns
  const columns = [
    { field: "name", headerName: "Name", flex: 0.5, editable: false },
    { field: "email", headerName: "Email", flex: 0.5, editable: false },
    {
      field: "projects",
      headerName: "Projects",
      flex: 1,
      renderCell: (params) => {
        return <ProjComponent params={params} />
      },
    },
    { field: "modal", headerName: "", flex: 0.2, editable: false, renderCell: (e) => RenderEditUserModal(e) },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: ({ id }) => {
    //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    //     //If already editing, change buttons to save/cancel
    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
    //         <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
    //       ];
    //     }
    //     //Edit and delete buttons show
    //     return [
    //       <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
    //       <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />,
    //     ];
    //   },
    // },
  ];



  return (
    <div className="user-table" style={{ width: "100%", height: "800px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        // getRowHeight={(params) => {
        //   const noProjects = params.model.projects.length;
        //   return 48 * noProjects
        // }}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
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

export default UserTable;
