import axios from "axios";

// type => list or notes

export const fetchTodos = (type, item = "") => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}/${item}`, config)
    .then((res) => res.data)
    .then((data) => Promise.resolve(data));
};

export const postTodos = async (payload, type) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}`,
      payload,
      config
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const updateTodos = async (id, payload, type) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}/${id}`,
      payload,
      config
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const deleteTodos = async (id, type) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${type}/${id}`,
      config
    );
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const fetchLoggedUser = async () => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      config
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
  const res = await axios.post(
    "https://rod-todos.herokuapp.com/auth/google",
    payload
  );
  return res.data;
};
