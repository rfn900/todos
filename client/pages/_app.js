import "../styles/globals.css";
import { UserContext } from "../context/user";
import { useState, useEffect } from "react";
import { fetchLoggedUser } from "../utils/apiCalls";
import { useRouter } from "next/dist/client/router";
import { Loading } from "../components/Loading";

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
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <Loading />
      </div>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
