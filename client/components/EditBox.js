import { useRef, useMemo, useState } from "react";
import { debounce } from "lodash";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { updateTodoList } from "../utils/apiCalls";
export const EditBox = ({
  todosToUpdate,
  setTodosToUpdate,
  listId,
  listTitle,
  setListTitle,
  editMode,
  setEditMode,
  savingStatus,
  setSavingStatus,
}) => {
  const editBoxRef = useRef();
  const DEBOUNCED_TIME = 1500; // Em ms

  const handleChange = async (payload) => {
    await updateTodoList(listId, payload);
  };

  const debouncedHandleChange = useMemo(
    (payload) => debounce(handleChange, DEBOUNCED_TIME),
    [listId]
  );

  return (
    <div
      ref={editBoxRef}
      onClick={(e) => editBoxRef.current === e.target && setEditMode(!editMode)}
      className={`absolute inset-0 bg-gray-700 bg-opacity-30 z-10 ${
        editMode ? "" : "hidden"
      }`}
    >
      <div className="absolute rounded-xl shadow-xl w-[600px] h-auto top-1/2 transition left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100">
        <div className="p-8 flex flex-col space-y-8">
          <div className="flex items-center justify-between w-full">
            <input
              type="text"
              defaultValue={listTitle}
              className="text-xl font-semibold bg-transparent w-5/6 focus:outline-none focus:ring-transparent border-0"
              onChange={async (e) => {
                setSavingStatus({
                  message: "Saving...",
                  date: false,
                });
                const newTitle = e.target.value;
                const payload = {
                  title: newTitle,
                  todos: todosToUpdate,
                  dateLastEdited: new Date(),
                };
                setListTitle(newTitle);
                debouncedHandleChange(payload);
                setTimeout(() => {
                  setSavingStatus({
                    message: "Last Edited at:",
                    date: new Date(),
                  });
                }, DEBOUNCED_TIME);
              }}
            />
            <p className="font-mono text-gray-500">Edit Mode</p>
          </div>
          <div className="border-b-px border-gray-400">
            {todosToUpdate.map((todo, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center border-t-px border-gray-400"
                >
                  <input
                    className="w-4 h-4 text-yellow-600 bg-transparent border-gray-500 rounded cursor-pointer focus:ring-gray-500"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={async (e) => {
                      setSavingStatus({
                        date: null,
                        message: "Saving...",
                      });
                      const newTodos = [
                        ...todosToUpdate.slice(0, index),
                        {
                          ...todosToUpdate[index],
                          completed: !todo.completed,
                        },
                        ...todosToUpdate.slice(index + 1),
                      ];
                      setTodosToUpdate(newTodos);
                      const payload = {
                        title: listTitle,
                        todos: newTodos,
                        dateLastEdited: new Date(),
                      };

                      await updateTodoList(listId, payload);
                      setSavingStatus({
                        date: new Date(),
                        message: "Last Edited at:",
                      });
                    }}
                  />
                  <div className="group flex h-full w-full justify-between items-center">
                    <input
                      type="text"
                      className={`bg-transparent w-full focus:outline-none focus:ring-transparent border-0 ${
                        todo.completed ? "line-through" : ""
                      }`}
                      value={todo.content || ""}
                      onChange={async (e) => {
                        setSavingStatus({
                          date: null,
                          message: "Saving...",
                        });
                        const newTodos = [
                          ...todosToUpdate.slice(0, index),
                          {
                            ...todosToUpdate[index],
                            content: e.target.value,
                          },
                          ...todosToUpdate.slice(index + 1),
                        ];
                        setTodosToUpdate(newTodos);
                        const payload = {
                          title: listTitle,
                          todos: newTodos,
                          dateLastEdited: new Date(),
                        };
                        debouncedHandleChange(payload);
                        setTimeout(() => {
                          setSavingStatus({
                            date: new Date(),
                            message: "Last Edited at:",
                          });
                        }, DEBOUNCED_TIME);
                      }}
                    />
                    <XIcon
                      onClick={(e) => {
                        setSavingStatus({
                          date: null,
                          message: "Saving...",
                        });
                        const newTodos = [
                          //immutable delete
                          ...todosToUpdate.slice(0, index),
                          ...todosToUpdate.slice(index + 1),
                        ];
                        setTodosToUpdate(newTodos);
                        const payload = {
                          title: listTitle,
                          todos: newTodos,
                          dateLastEdited: new Date(),
                        };
                        debouncedHandleChange(payload);
                        setTimeout(() => {
                          setSavingStatus({
                            date: new Date(),
                            message: "Last Edited at:",
                          });
                        }, DEBOUNCED_TIME);
                      }}
                      className="hidden h-4 ml-auto mr-8 text-gray-400 group-hover:block cursor-pointer "
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-between">
            <PlusIcon
              onClick={(e) =>
                setTodosToUpdate([
                  ...todosToUpdate,
                  {
                    content: "",
                    completed: false,
                  },
                ])
              }
              className="h-8 hover:bg-yellow-400 hover:bg-opacity-50 cursor-pointer transition rounded-full p-1 text-gray-500"
            />
            <div className="block text-gray-500 font-mono">
              <p className="text-sm">{savingStatus.message}</p>
              <p className="text-xs">
                {savingStatus.date &&
                  new Date(savingStatus.date).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
