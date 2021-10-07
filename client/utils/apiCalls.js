import axios from "axios";

export const fetchTodos = (item = "") => {
  return axios
    .get(`${process.env.BACKEND_URL}/todos/${item}`, { withCredentials: true })
    .then((res) => res.data)
    .then((data) => Promise.resolve(data));
};

export const postTodoList = async (payload) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/todos`, payload, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const updateTodoList = async (listId, payload) => {
  try {
    const res = await axios.put(
      `${process.env.BACKEND_URL}/todos/${listId}`,
      payload
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const deleteTodoList = async (listId) => {
  try {
    const res = await axios.delete(
      `${process.env.BACKEND_URL}/todos/${listId}`
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const fetchLoggedUser = async () => {
  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/users`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    /* handle error */
  }
};
