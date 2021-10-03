import {
  DocumentRemoveIcon,
  SaveIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

export const TodoListCard = ({ todoList }) => {
  const [todosToUpdate, setTodosToUpdate] = useState([...todoList.todos]);

  const hasListChanged = (loadedTodo, stateTodo) => {
    for (var i = 0; i < loadedTodo.length; i++) {
      if (loadedTodo[i].completed !== stateTodo[i].completed) return true;
      if (loadedTodo[i].content !== stateTodo[i].content) return true;
    }

    return false;
  };
  useEffect(() => {});
  return (
    <div className="relative group bg-gray-50 rounded-xl w-[300px] px-4 pt-6 pb-4 shadow-md transition duration-300 hover:shadow-xl flex flex-col">
      <h2 className="text-lg px-3 font-semibold">{todoList.title}</h2>
      <div className="w-full p-4">
        {todosToUpdate.map((todo, index) => {
          return (
            <>
              <label key={index} className="flex flex-col space-y-4 py-2">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    className="w-4 h-4 text-yellow-400 mt-1 border-gray-300 rounded focus:ring-gray-500"
                    onChange={(e) =>
                      setTodosToUpdate([
                        ...todosToUpdate.slice(0, index),
                        {
                          ...todosToUpdate[index],
                          completed: !todo.completed,
                        },
                        ...todosToUpdate.slice(index + 1),
                      ])
                    }
                  />
                  <span
                    className={`w-5/6 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    } `}
                  >
                    {todo.content}
                  </span>
                </div>
              </label>
            </>
          );
        })}
      </div>
      <div className=" h-10 px-2 mt-auto w-full bg-gray-50">
        <div className="w-full h-full transition duration-300 opacity-0 group-hover:opacity-100 flex items-start justify-between">
          <ReactTooltip />
          <button
            data-tip="Save Changes"
            data-type="dark"
            data-place="bottom"
            data-effect="solid"
            disabled={!hasListChanged(todoList.todos, todosToUpdate)}
            className="flex items-center justify-center rounded-full  hover:shadow hover:bg-gray-100 disabled:shadow-none disabled:cursor-default disabled:bg-transparent disabled:opacity-40 h-12 w-12"
          >
            <SaveIcon className="h-6 text-gray-500" />
          </button>
          <ReactTooltip />
          <button
            data-tip="Delete Todo List"
            data-type="dark"
            data-place="bottom"
            data-effect="solid"
            className="flex items-center justify-center rounded-full  hover:shadow hover:bg-gray-100 h-12 w-12"
          >
            <TrashIcon className="h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="absolute -top-2 -left-3 h-6 w-6">
        <CheckCircleIcon className="w-full h-full text-gray-800 opacity-0 transition duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
};
