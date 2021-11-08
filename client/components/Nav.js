import { DocumentTextIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useUser } from "../context/user";
export const Nav = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const { user, setUser } = useUser();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };
  return (
    <nav className="flex px-8 items-center justify-between border-b-2 py-2">
      <div className="flex items-center justify-around gap-4">
        <DocumentTextIcon className="h-10 py-2 px-1 bg-yellow-300 text-white" />
        <h3 className="text-2xl font-light text-gray-600">
          <a href="/">TODOS</a>
        </h3>
      </div>
      <div className="flex gap-2 items-center relative">
        <ChevronDownIcon
          onClick={() => setShowDropDown(!showDropdown)}
          className="h-6 text-gray-500 cursor-pointer"
        />
        <img
          src={user.imageUrl}
          alt="Profile bild"
          className="object-contain rounded-full shadow h-10 w-10"
        />
        <div
          className={`bg-gray-50 p-4 w-[100px] shadow-lg transition absolute top-12 right-1 flex flex-col gap-4 items-start ${
            showDropdown ? "block" : "hidden"
          }`}
        >
          <div>
            <a href="/profile">Profile</a>
          </div>
          <div>
            <a className="cursor-pointer" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}
