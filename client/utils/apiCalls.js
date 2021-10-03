import axios from "axios";

export const fetchTodos = (item = "") => {
  return axios
    .get(`${process.env.BACKEND_URL}/${item}`)
    .then((res) => res.data)
    .then((data) => Promise.resolve(data));
};

export const postTodoList = async (payload) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}`, payload);
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const updateTodoList = async (listId, payload) => {
  try {
    const res = await axios.put(
      `${process.env.BACKEND_URL}/${listId}`,
      payload
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};
