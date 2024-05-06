import * as types from "./actionTypes";
import axios from "axios";

// GET todos (GET)
export const gettodos = () => (dispatch) => {
  dispatch({ type: types.GET_TODO_REQUEST });
  return axios
    .get(`https://to-do-app-server-6sx6.onrender.com/todos`)
    .then((res) => {
      dispatch({ type: types.GET_TODO_SUCCESS, payload: res.data });
    })
    .catch((res) => {
      dispatch({ type: types.GET_TODO_FAILURE, payload: res });
    });
};

// ADD todos (POST)
export const addtodos = (payload) => async (dispatch) => {
  dispatch({ type: types.ADD_TODO_REQUEST });
  // console.log("payload", payload);
  try {
    let res = await axios.post(
      `https://to-do-app-server-6sx6.onrender.com/todos`,
      payload
    );
    dispatch({ type: types.ADD_TODO_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: types.ADD_TODO_FAILURE, payload: e });
  }
};

// EDIT todos (PATCH)
export const updatetodos = (editedtodos) => async (dispatch) => {
  const { id, title, description } = editedtodos;
  // console.log("actions", editedtodos);

  dispatch({ type: types.EDIT_TODO_REQUEST });
  try {
    const res = await axios.patch(
      `https://to-do-app-server-6sx6.onrender.com/todos/${id}`,
      {
        id: id,
        title: title,
        description: description,
      }
    );
    dispatch({ type: types.EDIT_TODO_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: types.EDIT_TODO_FAILURE, payload: e });
  }
};

// DELETE todos
export const deletetodos = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_TODO_REQUEST });
  try {
    await axios.delete(
      `https://to-do-app-server-6sx6.onrender.com/todos/${id}`
    );
    dispatch({ type: types.DELETE_TODO_SUCCESS, payload: id });
  } catch (e) {
    dispatch({ type: types.DELETE_TODO_FAILURE, payload: e });
  }
};
