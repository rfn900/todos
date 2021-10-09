import { useState, useEffect, useRef, useMemo } from "react";
import {
  PlusCircleIcon,
  PlusIcon,
  ViewGridAddIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import { debounce } from "lodash";
import { fetchTodos, postTodoList, updateTodoList } from "../utils/apiCalls";
import { SavedTodoLists } from "./SavedTodoLists";

import { MDEditor } from "./Markdown";
import { useUser } from "../context/user";
import { TextInput } from "./TextInput";
import { DeleteIcon } from "./DeleteIcon";
import { Checkbox } from "./Checkbox";
import { FormAddTodoList } from "./FormAddTodoList";
import { ButtonMainForm } from "./ButtonMainForm";
export const TodoListsView = () => {
  const [todos, setTodos] = useState(null);
  const [todoMDText, setTodoMDText] = useState(null);
  const [savedTodoLists, setSavedTodoLists] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const user = useUser();
  const handleListClick = async (e) => {
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
          disable={todos || todoMDText ? true : false}
          handleListClick={handleListClick}
          listInputRef={listInputRef}
          handleNoteClick={() =>
            setTodoMDText(`# ${listInputRef.current.value}`)
          }
        />
        {todoMDText && (
          <>
            <div className="w-full">
              <MDEditor value={todoMDText} onChange={setTodoMDText} />
            </div>
            <div className="flex items-center justify-between w-full px-4 py-4">
              <ButtonMainForm
                toolTipText="Clear Note"
                disable={false}
                eventHandler={() => setTodoMDText(null)}
                Icon={XCircleIcon}
              />
              <ButtonMainForm
                toolTipText="Add Note to View"
                disable={false}
                eventHandler={() => console.log(listInputRef.current.value)}
                Icon={ViewGridAddIcon}
              />
            </div>
          </>
        )}
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
              <ButtonMainForm
                toolTipText="Add New List Item"
                disable={false}
                eventHandler={() => {
                  setTodos([
                    ...todos,
                    {
                      content: "",
                      completed: false,
                    },
                  ]);
                }}
                Icon={PlusCircleIcon}
              />
              <ButtonMainForm
                toolTipText="Add List to View"
                disable={false}
                eventHandler={() => {
                  fetchTodos().then(setSavedTodoLists);
                  setTodos(null);
                  console.log(todos);
                  listInputRef.current.value = "";
                }}
                Icon={ViewGridAddIcon}
              />
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
