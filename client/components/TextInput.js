export const TextInput = ({ todo, onChange }) => {
  return (
    <input
      type="text"
      name="todo_item"
      placeholder="List Item"
      value={todo.content || ""}
      className={`w-5/6 outline-none focus:ring-transparent focus:border-transparent border-transparent pl-2 ${
        todo.completed ? "line-through text-gray-400" : ""
      }`}
      onChange={onChange}
    />
  );
};
