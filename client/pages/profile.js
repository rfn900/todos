import { useState } from "react";
import { Nav } from "../components/Nav";
import { useUser } from "../context/user";
import { deleteMe } from "../utils/apiCalls";

export default function Home() {
  const { user } = useUser();
  const [userDeleted, setUserDeleted] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure about this? This can't be undone?")) {
      deleteMe().then((isDeleted) => {
        if (isDeleted) {
          localStorage.removeItem("token");
          setUserDeleted(true);
        }
      });
    }
  };

  if (userDeleted)
    return (
      <div className="flex gap-4 flex-col items-center justify-center max-w-8xl mx-auto min-h-screen py-2">
        <h2 className="text-3xl">This user has been deleted</h2>
        <h3 className="text-2xl">Sad to see you go 😥 </h3>
      </div>
    );

  return (
    <div className="flex flex-col max-w-8xl mx-auto min-h-screen py-2">
      <Nav />
      <div className="relative flex w-[480px] rounded h-[400px] shadow m-auto transition hover:shadow-lg border-px items-center gap-8 justify-center">
        <img
          src={user.imageUrl}
          className="rounded-full shadow-lg"
          alt="profile photo"
        />
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold">Name: </span>
            {user.name}
          </p>
          <p>
            <span className="font-bold">Email: </span>
            {user.email}
          </p>
          <p>
            <span className="font-bold">Registered at: </span>
            {new Date(user.registerDate).toLocaleString()}
          </p>
          <button
            className="absolute bottom-12 right-12 text-red-500"
            onClick={() => handleDelete()}
          >
            delete user
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}
