export const Checkbox = ({ todo, onChange }) => {
  return (
    <input
      onChange={onChange}
      type="checkbox"
      checked={todo.completed}
      name="complete"
      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
  );
};
