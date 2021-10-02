import { useState, useEffect, useRef } from "react";
import {
  DocumentAddIcon,
  PlusIcon,
  XIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";

export const TodoListsView = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [todos, setTodos] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO: Save TodoList to Database
    setTodos([
      {
        content: "",
        completed: false,
      },
    ]);
    console.log(e);
  };

  const listInputRef = useRef();
  useEffect(() => {
    setIsMounted(true);
    console.log(todos);
    if (!todos) listInputRef.current.value = "";
  }, [todos]);

  return (
    <div className="flex items-center justify-center w-full mt-12">
      <div className="w-1/2 border-2 border-gray-300 shadow-md rounded-xl">
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-between w-full px-4">
            <input
              ref={listInputRef}
              required
              className="w-full text-gray-600 placeholder-gray-600 outline-none font-bold"
              type="text"
              name="todo_add"
              placeholder="Todo List Title..."
            />
            {isMounted && <ReactTooltip />}
            <button
              disabled={todos ? true : false}
              data-tip="Add New List"
              data-type="dark"
              data-place="bottom"
              data-effect="solid"
              type="submit"
              className={`flex items-center justify-center p-4 rounded-full transition ${
                todos ? "cursor-default" : "hover:bg-gray-50"
              }`}
            >
              <DocumentAddIcon
                className={`h-6 w-6 text-gray-500 ${todos ? "opacity-50" : ""}`}
              />
            </button>
          </div>
        </form>
        {todos && (
          <>
            {todos.map((todo, index) => {
              return (
                <div
                  key={index}
                  className={`group flex items-center border-b-px ${
                    !index ? "border-t-px" : ""
                  } border-gray-300`}
                >
                  <div className="flex items-center w-full px-6 py-1  gap-2">
                    {todo.content === "" ? (
                      <PlusIcon className="h-4 text-gray-400" />
                    ) : (
                      <input
                        onChange={() =>
                          setTodos([
                            ...todos.slice(0, index),
                            {
                              ...todos[index],
                              completed: !todo.completed,
                            },
                            ...todos.slice(index + 1),
                          ])
                        }
                        type="checkbox"
                        checked={todo.completed}
                        name="complete"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    )}
                    <input
                      type="text"
                      name="todo_item"
                      placeholder="List Item"
                      value={todo.content || ""}
                      className={`w-5/6 outline-none pl-2 ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                      onChange={(e) =>
                        setTodos([
                          ...todos.slice(0, index),
                          {
                            ...todos[index],
                            content: e.target.value,
                          },
                          ...todos.slice(index + 1),
                        ])
                      }
                    />
                  </div>
                  <XIcon
                    onClick={(e) =>
                      setTodos([
                        ...todos.slice(0, index),
                        ...todos.slice(index + 1),
                      ])
                    }
                    className="text-gray-400 cursor-pointer h-4 ml-auto mr-8 hidden group-hover:block"
                  />
                </div>
              );
            })}
            <div className="flex py-4 px-4 items-center justify-between w-full">
              <button
                onClick={() =>
                  setTodos([
                    ...todos,
                    {
                      content: "",
                      completed: false,
                    },
                  ])
                }
                className="text-gray-500 flex w-auto hover:bg-gray-50 rounded-full px-4"
              >
                Add New Item
              </button>
              <ReactTooltip />
              <button
                data-tip="Add List to View"
                data-type="dark"
                data-place="bottom"
                data-effect="solid"
                type="submit"
                className={`flex items-center p-2 mr-2 justify-center rounded-full transition hover:bg-gray-50`}
                onClick={() => {
                  setTodos(null);
                  console.log(todos);
                }}
              >
                <ViewGridAddIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
