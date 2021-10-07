import { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { Nav } from "../components/Nav";
import { TodoListsView } from "../components/TodoListsView";
import { fetchLoggedUser } from "../utils/apiCalls";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchLoggedUser().then(setUser);
    console.log(user);
  }, []);
  return (
    <div className="flex flex-col max-w-8xl mx-auto min-h-screen py-2">
      {user ? (
        <>
          <Nav user={user} />
          <TodoListsView user={user} />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
