import { useRef, useState } from "react";

export const EditBox = ({ todoList, editMode, setEditMode }) => {
  const [updatedTodoList, setUpdatedTodoList] = useState(todoList);
  const editBoxRef = useRef();

  const handleClick = (e) => {
    editBoxRef.current === e.target && setEditMode(!editMode);
    setUpdatedTodoList(todoList);
  };
  return (
    <div
      ref={editBoxRef}
      onClick={(e) => editBoxRef.current === e.target && setEditMode(!editMode)}
      className={`absolute inset-0 bg-gray-700 bg-opacity-30 ${
        editMode ? "" : "hidden"
      }`}
    >
      <div className="absolute rounded-xl shadow-xl w-[600px] h-[400px] top-1/2 transition left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100">
        <div className="p-8 flex flex-col space-y-8">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold">{updatedTodoList.title}</h2>
            <p className="font-mono text-gray-500">Edit Mode</p>
          </div>
          <div className="border-b-px border-gray-400">
            {updatedTodoList.todos.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center border-t-px border-gray-400"
                >
                  <input
                    className="w-4 h-4 text-yellow-600 bg-transparent border-gray-500 rounded cursor-pointer focus:ring-gray-500"
                    type="checkbox"
                    defaultChecked={item.completed}
                  />
                  <input
                    type="text"
                    className={`bg-transparent w-full focus:outline-none focus:ring-transparent border-0 ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                    defaultValue={item.content}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
