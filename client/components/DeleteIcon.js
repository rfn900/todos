import { XIcon } from "@heroicons/react/outline";
export const DeleteIcon = ({
  todos,
  setTodos,
  debouncedHandleChange,
  index,
}) => {
  return (
    <XIcon
      onClick={(e) => {
        const newTodos = [
          //immutable delete
          ...todos.slice(0, index),
          ...todos.slice(index + 1),
        ];
        setTodos(newTodos);
        debouncedHandleChange(newTodos);
      }}
      className="hidden h-4 ml-auto mr-8 text-gray-400 cursor-pointer group-hover:block"
    />
  );
};
