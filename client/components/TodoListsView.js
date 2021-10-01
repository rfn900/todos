import { useState, useEffect, useRef } from "react";
import {
  DocumentAddIcon,
  PlusIcon,
  XIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";

export const TodoListsView = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO: Save TodoList to Database
    setTodos([""]);
    setEditMode(true);
    console.log(e);
  };

  const listInputRef = useRef();
  useEffect(() => {
    setIsMounted(true);
    console.log(todos);
    if (!editMode) listInputRef.current.value = "";
  }, [todos, editMode]);

  return (
    <div className="flex items-center justify-center w-full mt-12">
      <div className="w-1/2 border-2 border-gray-300 shadow-md rounded-xl">
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-between w-full px-4">
            <input
              ref={listInputRef}
              required
              className="w-full text-gray-600 placeholder-gray-600 outline-none"
              type="text"
              name="todo_add"
              placeholder="Todo List Title..."
            />
            {isMounted && <ReactTooltip />}
            <button
              disabled={editMode}
              data-tip="Add New List"
              data-type="dark"
              data-place="bottom"
              data-effect="solid"
              type="submit"
              className={`flex items-center justify-center p-4 rounded-full transition ${
                editMode ? "cursor-default" : "hover:bg-gray-50"
              }`}
            >
              <DocumentAddIcon
                className={`h-6 w-6 text-gray-500 ${
                  editMode ? "opacity-50" : ""
                }`}
              />
            </button>
          </div>
        </form>
        {editMode && (
          <>
            <form className="w-full ">
              {todos.map((_, index) => {
                return (
                  <div
                    key={index}
                    className={`group flex items-center border-b-px ${
                      !index ? "border-t-px" : ""
                    } border-gray-300`}
                  >
                    <label className=" flex px-6 py-1 items-center w-full gap-2">
                      {todos[index] === "" ? (
                        <PlusIcon className="h-4 text-gray-400" />
                      ) : (
                        <input
                          type="checkbox"
                          name="complete"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      )}
                      <input
                        type="text"
                        name="todo_item"
                        placeholder="List Item"
                        className="w-5/6 outline-none pl-2"
                        onChange={(e) =>
                          setTodos([
                            ...todos.slice(0, index),
                            e.target.value,
                            ...todos.slice(index + 1),
                          ])
                        }
                      />
                    </label>
                    <XIcon className="text-gray-400 cursor-pointer h-4 ml-auto mr-8 hidden group-hover:block" />
                  </div>
                );
              })}
            </form>
            <div className="flex py-4 px-4 items-center justify-between w-full">
              <button
                onClick={() => setTodos([...todos, ""])}
                className="text-gray-500 flex w-auto hover:bg-gray-50 rounded-full px-4"
              >
                Add New Item
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setTodos([]);
                  console.log(todos);
                }}
                className="text-gray-500 flex w-auto hover:bg-gray-50 rounded-full px-4"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
