import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const RenderDate = (props) => {
  const { hasFocus, value, id } = props;
  const buttonElement = useRef(null);
  const rippleRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current.querySelector('input');
      input?.focus();
    } else if (rippleRef.current) {

      rippleRef.current.stop({});
    }
  }, [hasFocus]);

  const handleOpenTask = (e) => {
    const id = e.target.id;
    const curr = window.location.pathname
    const link = `${curr}/task/q=${id}`
    
    navigate(link)

  }

  return (
    <strong>
      {value}
      <Button
        ref={buttonElement}
        touchRippleRef={rippleRef}
        variant="contained"
        size="small"
        id={id}
        style={{ marginLeft: 16 }}
        // Remove button from tab sequence when cell does not have focus
        tabIndex={hasFocus ? 0 : -1}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
        onClick={(e) => handleOpenTask(e)}
      >
        Open
      </Button>
    </strong>
  );
}

const ProjectTable = ({ tasks }) => {
  const [rows, setRows] = useState([]);



  useEffect(() => {
    if (tasks !== undefined) {
      console.log("show grid");

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

  console.log(rows);
  

  const columns = [
    { field: "title", headerName: "Title", width: 150, editable: true, renderCell: RenderDate,  },
    { field: "owner", headerName: "Owner", width: 150, editable: true  },
    { field: "status", headerName: "Status", width: 150, editable: true  },
    { field: "dueDate", headerName: "Due date", width: 150, editable: true  },
    { field: "assignee", headerName: "Assignee", width: 150, editable: true  },
    { field: "description", headerName: "Description", width: 150, editable: true  },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default ProjectTable;
