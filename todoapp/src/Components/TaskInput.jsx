import {
  Button,
  Snackbar,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addtodos, gettodos } from "../Redux/actions";
import { useState, useReducer } from "react";

let logindata = JSON.parse(localStorage.getItem("logindata"));
let userid;

if (logindata) {
  userid = logindata.userID;
}

const initialState = {
  title: "",
  description: "",
  priorities: "",
  userID: userid,
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "userID":
      return { ...state, userID: action.payload };
    default:
      return state;
  }
};

const TaskInput = () => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState("");
  const todoData = useSelector((store) => store.todos);
  const [productState, setProductState] = useReducer(
    reducerFunction,
    initialState
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const addTodoHandler = () => {
    if (logindata) {
      setProductState({ type: "userID", payload: userid });
      if (todoData.length && todoData.length >= 0) {
        let notThere = true;
        for (let i = 0; i < todoData.length; i++) {
          if (todoData[i].title === productState.title) {
            notThere = false;
            break;
          }
        }

        if (notThere) {
          const updatedProductState = {
            ...productState,
            priorities: priority,
          };

          dispatch(addtodos(updatedProductState)).then(() => {
            dispatch(gettodos());
            setSnackbarMessage("Your new todo is added now.");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
          });
        } else {
          setSnackbarMessage("Todo Already Exists");
          setSnackbarSeverity("info");
          setSnackbarOpen(true);
        }
      }

      if (todoData.length === 0) {
        const updatedProductState = {
          ...productState,
          priorities: priority,
        };

        dispatch(addtodos([updatedProductState])).then(() => {
          dispatch(gettodos());
          setSnackbarMessage("Your new todo is added now.");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        });
      }
    } else {
      setSnackbarMessage("Please login first");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    }
  };

  return (
    <form
      style={{
        width: "80%",
        margin: "auto",
        padding: "20px",
        marginTop: "20px",
        border: "1px solid black",
        borderRadius: "15px",
      }}
      noValidate
      autoComplete="off"
    >
      {/* Input Title */}
      <div>
        <label style={{ fontSize: "15px", fontWeight: "bold", padding: "5px" }}>
          Title:
        </label>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add Title ...."
          onChange={(e) =>
            setProductState({ type: "title", payload: e.target.value })
          }
        />
      </div>

      {/* Input description */}
      <div>
        <label
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            padding: "5px",
          }}
        >
          Description:
        </label>
        <TextareaAutosize
          rowsMin={5}
          style={{ width: "100%", padding: "8px", fontSize: "15px" }}
          placeholder="Add Description ...."
          onChange={(e) =>
            setProductState({ type: "description", payload: e.target.value })
          }
        />
      </div>

      {/* Select Priority */}
      <div>
        <label style={{ fontSize: "15px", fontWeight: "bold", padding: "5px" }}>
          Priority:
        </label>
        <Select
          fullWidth
          variant="outlined"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="Hard">Hard</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
        </Select>
      </div>

      {/* Button */}
      <Button
        style={{
          fontWeight: "bold",
          padding: "10px 20px",
          marginTop: "15px",
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
        variant="contained"
        color="primary"
        onClick={addTodoHandler}
      >
        Add Todo
      </Button>

      {/* Snackbar for notification */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </form>
  );
};

export default TaskInput;
