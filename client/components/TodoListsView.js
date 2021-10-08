import { useState, useEffect, useRef, useMemo } from "react";
import { PlusIcon, ViewGridAddIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import { debounce } from "lodash";
import { fetchTodos, postTodoList, updateTodoList } from "../utils/apiCalls";
import { SavedTodoLists } from "./SavedTodoLists";

import { useUser } from "../context/user";
import { TextInput } from "./TextInput";
import { DeleteIcon } from "./DeleteIcon";
import { Checkbox } from "./Checkbox";
import { FormAddTodoList } from "./FormAddTodoList";
export const TodoListsView = () => {
  const [todos, setTodos] = useState(null);
  const [savedTodoLists, setSavedTodoLists] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const user = useUser();
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
      userId: user._id,
      title: listInputRef.current.value,
      todos: newTodoListContent,
      dateLastEdited: new Date(),
    };

    const { _id } = await postTodoList(payload);
    setActiveList(_id);
  };
  const DEBOUNCED_TIME = 350;

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
    (newTodos) => debounce(handleChange, DEBOUNCED_TIME),
    [activeList]
  );

  const listInputRef = useRef();

  useEffect(() => {
    fetchTodos().then(setSavedTodoLists);
  }, []);

  return (
    <div className="flex flex-col pb-8 items-center justify-center w-full px-8 mt-12 sm:px-0">
      <div className="w-full border-2 border-gray-300 shadow-md sm:w-1/2 rounded-xl">
        <FormAddTodoList
          todos={todos}
          handleSubmit={handleSubmit}
          listInputRef={listInputRef}
        />
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
                      <Checkbox
                        todos={todos}
                        setTodos={setTodos}
                        index={index}
                      />
                    )}
                    <TextInput
                      todos={todos}
                      setTodos={setTodos}
                      debouncedHandleChange={debouncedHandleChange}
                      index={index}
                    />
                  </div>
                  <DeleteIcon
                    todos={todos}
                    setTodos={setTodos}
                    debouncedHandleChange={debouncedHandleChange}
                    index={index}
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
