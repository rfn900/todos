import axios from "axios";

// type => list or notes
const apiUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL + process.env.NEXT_PUBLIC_API_ROUTE;
export const fetchTodos = (type, item = "") => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${apiUrl}/todos/${type}/${item}`, config)
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
    const res = await axios.post(`${apiUrl}/todos/${type}`, payload, config);
    console.log(res.data);
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
      `${apiUrl}/todos/${type}/${id}`,
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
    const res = await axios.delete(`${apiUrl}/todos/${type}/${id}`, config);
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
    const res = await axios.get(`${apiUrl}/users`, config);
    return res.data;
  } catch (e) {
    /* handle error */
  }
};

export const deleteMe = async () => {
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/deleteMe`,
      config
    );
    return res.data.success;
  } catch (e) {
    console.error(e);
  }
};

export const googleLogin = async (payload) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
    payload
  );
  return res.data;
};
