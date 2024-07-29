import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useOpenContext } from "../../utils/openContext";

const AccountPage = () => {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [colourEdit, setColourEdit] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [colour, setColour] = useState("");

  const theme = useTheme();
  const { open, setOpen, drawerWidth } = useOpenContext();

  const handleUpdateUser = () => {};

  return (
    <>
    <Box
    component="main"
    sx={{
      width: open ? `calc(100% - ${drawerWidth}px)` : "calc(100% - 65px)",
      flexGrow: 1,
      p: 3,
      marginLeft: open ? `${drawerWidth}px` : "65px",
    }}
  >
      {!nameEdit && (
        <div className="flex-row status ">
          <p className="  project-title">{name}</p>
          <Button
            onClick={() => setNameEdit(true)}
            sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
          >
            <EditIcon sx={{ fontSize: "16px" }} />
          </Button>
        </div>
      )}
      {nameEdit && (
        <div className="flex-row">
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={(e) => handleUpdateUser(e)}
            sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
          >
            <SaveIcon sx={{ fontSize: "16px" }} />
          </Button>
          <Button
            onClick={(e) => setNameEdit(false)}
            sx={{ color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText }}
          >
            <CancelIcon sx={{ fontSize: "16px" }} />
          </Button>
        </div>
      )}
    </Box>
    </>
  );
};

export default AccountPage;
