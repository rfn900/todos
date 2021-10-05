import { useRef, useMemo, useState } from "react";
import { debounce } from "lodash";
import { PlusIcon } from "@heroicons/react/outline";
import { updateTodoList } from "../utils/apiCalls";
export const EditBox = ({
  todosToUpdate,
  setTodosToUpdate,
  listId,
  listTitle,
  editMode,
  setEditMode,
}) => {
  const editBoxRef = useRef();

  const handleChange = async (newTodos) => {
    const payload = {
      title: listTitle,
      todos: newTodos,
      dateLastEdited: new Date(),
    };
    await updateTodoList(listId, payload);
  };

  const debouncedHandleChange = useMemo(
    (newTodos) => debounce(handleChange, 300),
    [listId]
  );
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
      <div className="absolute rounded-xl shadow-xl w-[600px] h-auto top-1/2 transition left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100">
        <div className="p-8 flex flex-col space-y-8">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold">{listTitle}</h2>
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
                    defaultChecked={todo.completed}
                    onChange={async (e) => {
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
                    }}
                  />
                  <input
                    type="text"
                    className={`bg-transparent w-full focus:outline-none focus:ring-transparent border-0 ${
                      todo.completed ? "line-through" : ""
                    }`}
                    defaultValue={todo.content}
                    onChange={async (e) => {
                      const newTodos = [
                        ...todosToUpdate.slice(0, index),
                        {
                          ...todosToUpdate[index],
                          content: e.target.value,
                        },
                        ...todosToUpdate.slice(index + 1),
                      ];
                      setTodosToUpdate(newTodos);
                      debouncedHandleChange(newTodos);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};
