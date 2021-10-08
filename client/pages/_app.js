import "../styles/globals.css";
import { UserContext } from "../context/user";
import { useState, useEffect } from "react";
import { fetchLoggedUser, isLoggedIn } from "../utils/apiCalls";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  if (router.pathname === "/login" && user) router.push("/");
  useEffect(() => {
    (async () => {
      const fetchedUser = await fetchLoggedUser();
      if (!fetchedUser) router.push("/login");
      setUser(fetchedUser);
    })();
  }, []);

  if (pageProps.protected && !user) {
    return <h1>Loading...</h1>;
  }
  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
