import { XIcon } from "@heroicons/react/outline";
export const DeleteIcon = ({ onClick }) => {
  return (
    <XIcon
      onClick={onClick}
      className="hidden h-4 ml-auto mr-8 text-gray-400 cursor-pointer group-hover:block"
    />
  );
};
