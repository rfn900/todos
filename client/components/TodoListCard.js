import { SaveIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import { deleteTodoList, fetchTodos, updateTodoList } from "../utils/apiCalls";
import { EditBox } from "./EditBox";

export const TodoListCard = ({ todoList, setSavedTodoLists }) => {
  const [todosToUpdate, setTodosToUpdate] = useState([...todoList.todos]);
  const [listTitle, setListTitle] = useState(todoList.title);
  const [editMode, setEditMode] = useState(false);
  const [savingStatus, setSavingStatus] = useState({
    date: todoList.dateLastEdited,
    message: "Last edited at:",
  });

  const hasListChanged = (loadedTodo, stateTodo) => {
    for (var i = 0; i < loadedTodo.length; i++) {
      if (loadedTodo[i].completed !== stateTodo[i].completed) return true;
      if (loadedTodo[i].content !== stateTodo[i].content) return true;
    }

    return false;
  };

  useEffect(() => {});

  return (
    <div className="group bg-gray-50 rounded-xl w-[300px] px-4 pt-6 pb-4 shadow-md transition duration-300 hover:shadow-xl flex flex-col">
      <h2
        onClick={() => setEditMode(!editMode)}
        className="px-3 text-lg font-semibold"
      >
        {listTitle}
      </h2>
      <div className="w-full p-4">
        {todosToUpdate.map((todo, index) => {
          return (
            <div
              key={index}
              className="flex flex-col py-2 cursor-default space-y-4"
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="w-4 h-4 mt-1 text-yellow-400 border-gray-300 rounded cursor-pointer focus:ring-gray-500"
                  onChange={async (e) => {
                    setSavingStatus({
                      date: false,
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

                    await updateTodoList(todoList._id, payload);
                    setSavingStatus({
                      date: new Date(),
                      message: "Last edited at:",
                    });
                  }}
                />
                <span
                  onClick={() => setEditMode(!editMode)}
                  className={`w-5/6 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  } `}
                >
                  {todo.content}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full h-10 px-2 mt-auto  bg-gray-50">
        <div className="flex items-center justify-between w-full h-full opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="block text-gray-500 font-mono">
            <p className="text-sm">{savingStatus.message}</p>
            <p className="text-xs">
              {savingStatus.date &&
                new Date(savingStatus.date).toLocaleString()}
            </p>
          </div>
          <ReactTooltip />
          <button
            data-tip="Delete Todo List"
            data-type="dark"
            data-place="bottom"
            data-effect="solid"
            onClick={async () => {
              await deleteTodoList(todoList._id);
              fetchTodos().then(setSavedTodoLists);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:shadow hover:bg-gray-100"
          >
            <TrashIcon className="h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <EditBox
        todosToUpdate={todosToUpdate}
        setTodosToUpdate={setTodosToUpdate}
        listId={todoList._id}
        listTitle={listTitle}
        setListTitle={setListTitle}
        editMode={editMode}
        setEditMode={setEditMode}
        savingStatus={savingStatus}
        setSavingStatus={setSavingStatus}
      />
    </div>
  );
};
