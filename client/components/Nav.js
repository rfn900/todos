import { DocumentTextIcon } from "@heroicons/react/outline";
export const Nav = () => {
  return (
    <nav className="flex px-8 items-center justify-between border-b-2 py-2">
      <div className="flex items-center justify-around gap-4">
        <DocumentTextIcon className="h-10 py-2 px-1 bg-yellow-300 text-white" />
        <h3 className="text-2xl font-light text-gray-600">Todos</h3>
      </div>
      <div className="h-10 w-10 rounded-full shadow ">
        <img src="/profile.png" alt="Profile bild" className="object-contain" />
      </div>
    </nav>
  );
};
