import axios from "axios";

// type => list or notes

export const fetchTodos = (type, item = "") => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}/${item}`, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .then((data) => Promise.resolve(data));
};

export const postTodos = async (payload, type) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}`,
      payload,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const updateTodos = async (id, payload, type) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}/${id}`,
      payload,
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const deleteTodos = async (id, type) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}/${id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const fetchLoggedUser = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const isLoggedIn = async () => {
  const res = await axios.get("http://localhost:5000/auth/check", {
    withCredentials: true,
  });
  return res.data.isAuthenticated;
};

export const googleLogin = async (payload) => {
  const res = await axios.post("http://localhost:5000/auth/google", payload);
  return res.data;
};
