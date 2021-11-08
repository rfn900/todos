import { useState, useEffect, useRef, useMemo } from "react";
import {
  PlusCircleIcon,
  PlusIcon,
  ViewGridAddIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { debounce } from "lodash";

import {
  fetchTodos,
  postTodos,
  updateTodos,
  deleteTodos,
} from "../utils/apiCalls";
import { SavedTodoLists } from "./SavedTodoLists";
import { SavedTodoNotes } from "./SavedTodoNotes";
import { MDEditor } from "./Markdown";
import { useUser } from "../context/user";
import { TextInput } from "./TextInput";
import { DeleteIcon } from "./DeleteIcon";
import { Checkbox } from "./Checkbox";
import { FormAddTodoList } from "./FormAddTodoList";
import { ButtonMain } from "./ButtonMain";

export const TodoListsView = () => {
  const [listsOrNotesView, setListsOrNotesView] = useState("notes");
  const [todos, setTodos] = useState(null);
  const [todoMDText, setTodoMDText] = useState(null);
  const [savedTodoLists, setSavedTodoLists] = useState(null);
  const [savedTodoNotes, setSavedTodoNotes] = useState(null);
  const [isFormActive, setIsFormActive] = useState(false);
  const [activeList, setActiveList] = useState(null);
  const { user } = useUser();

  const handleListClick = async (e) => {
    e.preventDefault();
    setTodoMDText(null);
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
    setIsFormActive(false);
    const { _id } = await postTodos(payload, "lists");
    setActiveList(_id);
    setListsOrNotesView("lists");
  };

  const handleNotesClick = async (e) => {
    e.preventDefault();
    setTodos(null);
    setIsFormActive(false);
    const title = listInputRef.current.value;
    setTodoMDText(`# ${title}`);
    const payload = {
      userId: user._id,
      notes: title,
      dateLastEdited: new Date(),
    };

    const { _id } = await postTodos(payload, "notes");
    setActiveList(_id);
    setListsOrNotesView("notes");
  };

  // Autosaving with debounce every 350 ms
  const DEBOUNCED_TIME = 350;
  const handleChange = async (payload) => {
    const editType = todoMDText ? "notes" : "lists";
    await updateTodos(activeList, payload, editType);
  };
  const debouncedHandleChange = useMemo(
    (payload) => debounce(handleChange, DEBOUNCED_TIME),
    [activeList]
  );

  const listInputRef = useRef();

  useEffect(() => {
    fetchTodos("lists").then(setSavedTodoLists);
    fetchTodos("notes").then(setSavedTodoNotes);
  }, []);

  return (
    <div className="flex flex-col pb-8 items-center justify-center w-full px-8 mt-12 sm:px-0">
      <div className="w-full border-2 border-gray-300 shadow-md sm:w-1/2 rounded-xl">
        <FormAddTodoList
          isFormActive={isFormActive}
          setIsFormActive={setIsFormActive}
          handleListClick={handleListClick}
          listInputRef={listInputRef}
          handleNotesClick={handleNotesClick}
        />
        {todoMDText && (
          <>
            <div className="w-full">
              <MDEditor value={todoMDText} onChange={setTodoMDText} />
            </div>
            <div className="flex items-center justify-between w-full px-4 py-4">
              <ButtonMain
                toolTipText="Clear Note"
                disable={false}
                eventHandler={async () => {
                  listInputRef.current.value = "";
                  setTodoMDText(null);
                  deleteTodos(activeList, "notes");
                }}
                Icon={XCircleIcon}
              />
              <ButtonMain
                toolTipText="Add Note to View"
                disable={false}
                eventHandler={async () => {
                  const payload = {
                    notes: todoMDText,
                    dateLastEdited: new Date(),
                  };
                  await updateTodos(activeList, payload, "notes");
                  listInputRef.current.value = "";
                  setIsFormActive(false);
                  setTodoMDText(null);
                  fetchTodos("notes").then(setSavedTodoNotes);
                }}
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
                        todo={todo}
                        onChange={() => {
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
                          const payload = {
                            title: listInputRef.current.value,
                            content: newTodos,
                            dateLastEdited: new Date(),
                          };
                          debouncedHandleChange(payload);
                        }}
                      />
                    )}
                    <TextInput
                      todo={todo}
                      onChange={async (e) => {
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
                        const payload = {
                          title: listInputRef.current.value,
                          todos: newTodos,
                          dateLastEdited: new Date(),
                        };
                        debouncedHandleChange(payload);
                      }}
                    />
                  </div>
                  <DeleteIcon
                    onClick={() => {
                      const newTodos = [
                        //immutable delete
                        ...todos.slice(0, index),
                        ...todos.slice(index + 1),
                      ];
                      setTodos(newTodos);
                      const payload = {
                        title: listInputRef.current.value,
                        content: newTodos,
                        dateLastEdited: new Date(),
                      };
                      debouncedHandleChange(payload);
                    }}
                  />
                </div>
              );
            })}
            <div className="flex items-center justify-between w-full px-4 py-4">
              <ButtonMain
                toolTipText="Add New Todo List"
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
              <ButtonMain
                toolTipText="Add List to View"
                disable={false}
                eventHandler={() => {
                  fetchTodos("lists").then(setSavedTodoLists);
                  setTodos(null);
                  listInputRef.current.value = "";
                  setIsFormActive(false);
                }}
                Icon={ViewGridAddIcon}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex mt-12 ">
        <button
          onClick={() => setListsOrNotesView("notes")}
          className={`${
            listsOrNotesView === "notes"
              ? "bg-yellow-200 Wext-gray-800 shadow-md"
              : "bg-gray-100 shadow text-gray-400"
          } px-4 rounded-l-full py-2 transition`}
        >
          Todo Notes
        </button>
        <button
          onClick={() => setListsOrNotesView("lists")}
          className={`${
            listsOrNotesView === "lists"
              ? "bg-yellow-200 text-gray-800 shadow-md"
              : "bg-gray-100 shadow text-gray-400"
          } px-4 rounded-r-full py-2 transition`}
        >
          Todo Lists
        </button>
      </div>

      {listsOrNotesView === "lists" && (
        <SavedTodoLists
          savedTodoLists={savedTodoLists}
          setSavedTodoLists={setSavedTodoLists}
        />
      )}
      {listsOrNotesView === "notes" && (
        <SavedTodoNotes
          savedTodoNotes={savedTodoNotes}
          setSavedTodoNotes={setSavedTodoNotes}
        />
      )}
    </div>
  );
};
