/* eslint-disable react/jsx-key */
import {   GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { UPDATE_TASK, DELETE_TASK } from "../utils/mutations";
import { QUERY_TASK } from "../utils/queries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'


//Create the toolbar to inline edit rows
function EditToolbar(props) {

  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    const id = 1();
    setRows((oldRows) => [...oldRows, { id, title: '', owner: '', status: '', dueDate: '', assignee: '', description: '' }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'title' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}


//Create the open task button within title cell
const RenderTaskButton = (props) => {
  const handleOpenTask = (e) => {
    const selectedId = e.target.id;
    const curr = window.location.pathname
    const link = `${curr}/task/q=${selectedId}`
    //Navigate to the task
    window.location.href = link;
  }
  
  return (
    <div className="flex-row justify align">
      <div>{props.value}</div>
      <IconButton
        variant="contained"
        size="small"
        id={props.id}
        onClick={(e) => handleOpenTask(e)}
      >
<OpenInFullIcon />
      </IconButton>
    </div>
  );
}

// function BasicUsage() {
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   return (
//     <>
//       <Button onClick={onOpen}>Open Modal</Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Lorem count={2} />
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme='blue' mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <Button variant='ghost'>Secondary Action</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }

const ProjectTable = ({ tasks }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  let taskId = "";

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  //Get the tasks from db and save into rows state
  useEffect(() => {
    if (tasks !== undefined) {
      const handleCreateRows = () => {
        const allTasks = tasks.tasks;
        let taskArr = [];
        allTasks.map((task) =>
          taskArr.push({
            id: task._id,
            title: task.title,
            owner: task.createdBy,
            status: task.status,
            dueDate: "11/11/2024",
            assignee: "Gayle",
            description: task.description,
          })
        );
        setRows(taskArr);
      };
      handleCreateRows();
    }
  }, [tasks]);

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
          _id: id
        },
      })

      console.log(data)
        
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
      const { data } = await updateTask({
        variables: {
          _id: taskId,
          title: updatedRow.title,
          description: updatedRow.description,
          dueDate: updatedRow.dueDate,
          status: updatedRow.status
        },
      })

      console.log(data)
        
    } catch (err) {
      console.error(err);
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  
//Create the columns
  const columns = [
    { field: "title", headerName: "Title", flex: 1, editable: true, renderCell: (e) => RenderTaskButton(e),  },
    { field: "owner", headerName: "Owner", flex: 0.5, editable: false  },
    { field: "status", headerName: "Status", flex: 0.5, editable: true  },
    { field: "dueDate", headerName: "Due date", flex: 0.5, editable: true  },
    { field: "assignee", headerName: "Assignee", flex: 0.5, editable: true  },
    { field: "description", headerName: "Description", flex: 2, editable: true  },
    {
      //Action buttons for inline editing
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        //If already editing, change buttons to save/cancel
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        //Edit and delete buttons show
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <TableWrapper style={{ width: "100%" }}>
      <DataGrid 
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              // slots={{
              //   toolbar: EditToolbar,
              // }}
              // slotProps={{
              //   toolbar: { setRows, setRowModesModel, rows },
              // }}
      />
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
padding-top: 3rem;
.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall {
  margin-left: auto;
  height: 25px;
  width: 25px;
  padding: 0.75rem;

  svg {
    height: 1rem;
    width: 1rem;
  }
}

.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall:hover {
  background-color: #dddddd;

}
`
export default ProjectTable;
