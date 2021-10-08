export const Checkbox = ({ todos, setTodos, index }) => {
  const todo = todos[index];
  return (
    <input
      onChange={() => {
        {
          const newTodos = [
            //immutable update
            ...todos.slice(0, index),
            {
              ...todos[index],
              completed: !todo.completed,
            },
            ...todos.slice(index + 1),
          ];
          setTodos(newTodos);
          debouncedHandleChange(newTodos);
        }
      }}
      type="checkbox"
      checked={todo.completed}
      name="complete"
      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
  );
};
