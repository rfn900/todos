export const Overlay = ({ editMode, setEditMode }) => {
  return (
    <div
      onClick={() => setEditMode(!editMode)}
      className={`absolute inset-0 bg-gray-700 opacity-30 ${
        editMode ? "" : "hidden"
      }`}
    ></div>
  );
};
