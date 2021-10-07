import { Nav } from "../components/Nav";
import { useUser } from "../context/user";

export default function Home() {
  const user = useUser();
  return (
    <div className="flex flex-col max-w-8xl mx-auto min-h-screen py-2">
      <Nav />
      <div className="flex w-[480px] rounded h-[400px] shadow m-auto border-px items-center gap-8 justify-center">
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
          <p></p>
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
