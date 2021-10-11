import { Nav } from "../components/Nav";
import { TodoListsView } from "../components/TodoListsView";
import { useUser } from "../context/user";
export default function Home() {
  const user = useUser();
  return (
    <div className="flex flex-col max-w-8xl mx-auto min-h-screen py-2">
      <Nav />
      <TodoListsView />
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
