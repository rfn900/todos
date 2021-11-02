import "../styles/globals.css";
import { UserContext } from "../context/user";
import { useState, useEffect } from "react";
import { fetchLoggedUser, isLoggedIn } from "../utils/apiCalls";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (router.pathname === "/login" && token) router.push("/");
    if (token) {
      fetchLoggedUser().then(setUser);
    } else {
      router.push("/login");
    }
  }, []);

  if (pageProps.protected && !user) {
    return <h1>Loading...</h1>;
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
