import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Modal,
  Button,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { gettodos, deletetodos, updatetodos } from "../Redux/actions";

const TaskList = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [userTodo, setUserTodo] = useState([]);
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  let accountdata = JSON.parse(localStorage.getItem("logindata"));
  let userTodoArr = [];

  const todosData = useSelector((store) => store.todos);

  // GET Todo by USER-ID
  const getUserTodo = () => {
    for (let i = 0; i < todosData.length; i++) {
      if (accountdata) {
        if (todosData[i].userID === accountdata.userID) {
          userTodoArr.push(todosData[i]);
        }
      }
    }
    setUserTodo(userTodoArr);
  };

  // Handle Delete Todo
  const handleDeleteTodo = (id) => {
    dispatch(deletetodos(id));
    getUserTodo();
  };

  // handle Edit Todo
  const editTodo = (todoid) => {
    setId(todoid);
    setIsOpen(true);
  };

  const addUpdatedTodoHandler = () => {
    const updatedTodo = {
      id: id,
      title: title,
      description: description,
    };
    dispatch(updatetodos(updatedTodo));
    getUserTodo();
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(gettodos());
    getUserTodo();
  }, [dispatch]);

  if (userTodo.length !== 0) {
    return (
      <Box style={{ marginTop: "25px", padding: "10px" }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          style={{ textDecoration: "underline", textAlign: "center" }}
        >
          Your Todos
        </Typography>
        <Box
          style={{
            width: "90%",
            margin: "auto",
            marginTop: "15px",
            display: "grid",
            textAlign: "left",
          }}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          }}
        >
          {userTodo.map((el, ind) => (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              key={ind}
              padding={"15px"}
              margin="10px"
              border="1px solid red"
              borderRadius="12px"
            >
              <h3>
                <span style={{ fontWeight: "bold" }}>Title: </span>
                {el.title}
              </h3>

              <h4>
                <span style={{ fontWeight: "bold" }}>Priority: </span>
                {el.priorities}
              </h4>

              <h4>
                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                {el.description}
              </h4>

              <Button
                variant="contained"
                color="primary"
                onClick={() => editTodo(el.id)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "12px" }}
                onClick={() => handleDeleteTodo(el.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Box
            style={{
              position: "absolute",
              width: 400,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2 style={{ fontWeight: "bold", paddingBottom: "10px" }}>
              Update Todo
            </h2>
            <Input
              name="title"
              type="text"
              fullWidth
              variant="outlined"
              placeholder="Update Title ...."
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextareaAutosize
              rowsMin={5}
              style={{ width: "100%", padding: "8px", fontSize: "15px" }}
              placeholder="Update Description ...."
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addUpdatedTodoHandler}
            >
              Update Todo
            </Button>
          </Box>
        </Modal>
      </Box>
    );
  }
};

export default TaskList;
