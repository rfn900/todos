import { useState, useEffect, useRef } from "react";
import {
  DocumentAddIcon,
  PlusIcon,
  XIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { TodoListCard } from "./TodoListCard";
export const TodoListsView = () => {
  const [todos, setTodos] = useState(null);
  const [savedTodoLists, setSavedTodoLists] = useState(null);

  const fetchTodos = (item = "") => {
    return axios
      .get(`${process.env.BACKEND_URL}/${item}`)
      .then((res) => res.data)
      .then((data) => Promise.resolve(data));
  };
  console.log(savedTodoLists);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO: Save TodoList to Database
    setTodos([
      {
        content: "",
        completed: false,
      },
    ]);
  };

  const listInputRef = useRef();
  useEffect(() => {
    fetchTodos().then(setSavedTodoLists);
    if (!todos) listInputRef.current.value = "";
  }, [todos]);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-12">
      <div className="w-1/2 border-2 border-gray-300 shadow-md rounded-xl">
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-between w-full px-4">
            <input
              ref={listInputRef}
              required
              className="w-full font-bold text-gray-600 placeholder-gray-600 border-transparent focus:ring-transparent focus:border-transparent"
              type="text"
              name="todo_add"
              placeholder="Todo List Title..."
            />
            {todos && <ReactTooltip />}
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
                  <div className="flex items-center w-full px-6 py-1 gap-2">
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
                      className={`w-5/6 outline-none focus:ring-transparent focus:border-transparent border-transparent pl-2 ${
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
                    className="hidden h-4 ml-auto mr-8 text-gray-400 cursor-pointer group-hover:block"
                  />
                </div>
              );
            })}
            <div className="flex items-center justify-between w-full px-4 py-4">
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
                className="flex w-auto px-4 text-gray-500 rounded-full hover:bg-gray-50"
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
                <ViewGridAddIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-24">
        {savedTodoLists &&
          savedTodoLists.map((list) => {
            return <TodoListCard key={list._id} todoList={list} />;
          })}
      </div>
    </div>
  );
};
