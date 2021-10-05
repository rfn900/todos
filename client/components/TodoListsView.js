import { useState, useEffect, useRef, useMemo } from "react";
import {
  DocumentAddIcon,
  PlusIcon,
  XIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import { debounce } from "lodash";
import { fetchTodos, postTodoList, updateTodoList } from "../utils/apiCalls";
import { SavedTodoLists } from "./SavedTodoLists";

export const TodoListsView = () => {
  const [todos, setTodos] = useState(null);
  const [savedTodoLists, setSavedTodoLists] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodoListContent = [
      {
        content: "",
        completed: false,
      },
    ];
    setTodos(newTodoListContent);
    const payload = {
      title: listInputRef.current.value,
      todos: newTodoListContent,
      dateLastEdited: new Date(),
    };

    const { _id } = await postTodoList(payload);
    setActiveList(_id);
    console.log(_id);
  };

  const handleChange = async (newTodos) => {
    const payload = {
      title: listInputRef.current.value,
      todos: newTodos,
      dateLastEdited: new Date(),
    };
    console.log(activeList, payload);
    await updateTodoList(activeList, payload);
  };

  const debouncedHandleChange = useMemo(
    (newTodos) => debounce(handleChange, 300),
    [activeList]
  );

  const listInputRef = useRef();

  useEffect(() => {
    fetchTodos().then(setSavedTodoLists);
  }, []);

  return (
    <div className="flex flex-col pb-8 items-center justify-center w-full px-8 mt-12 sm:px-0">
      <div className="w-full border-2 border-gray-300 shadow-md sm:w-1/2 rounded-xl">
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
                    )}
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
                  </div>
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
                </div>
              );
            })}
            <div className="flex items-center justify-between w-full px-4 py-4">
              <button
                onClick={() => {
                  setTodos([
                    ...todos,
                    {
                      content: "",
                      completed: false,
                    },
                  ]);
                }}
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
                  fetchTodos().then(setSavedTodoLists);
                  setTodos(null);
                  console.log(todos);
                  listInputRef.current.value = "";
                }}
              >
                <ViewGridAddIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </>
        )}
      </div>
      <SavedTodoLists
        savedTodoLists={savedTodoLists}
        setSavedTodoLists={setSavedTodoLists}
      />
    </div>
  );
};
