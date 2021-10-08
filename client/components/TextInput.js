export const TextInput = ({
  todos,
  setTodos,
  index,
  debouncedHandleChange,
}) => {
  const todo = todos[index];

  return (
    <input
      type="text"
      name="todo_item"
      placeholder="List Item"
      value={todo.content || ""}
      className={`w-5/6 outline-none focus:ring-transparent focus:border-transparent border-transparent pl-2 ${
        todo.completed ? "line-through text-gray-400" : ""
      }`}
      onChange={(e) => {
        const newTodos = [
          //immutable update
          ...todos.slice(0, index),
          {
            ...todos[index],
            content: e.target.value,
          },
          ...todos.slice(index + 1),
        ];
        setTodos(newTodos);
        debouncedHandleChange(newTodos);
      }}
    />
  );
};
