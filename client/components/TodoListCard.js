import {
  DocumentRemoveIcon,
  SaveIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";

export const TodoListCard = ({ todoList }) => {
  const [todosToUpdate, setTodosToUpdate] = useState([...todoList.todos]);

  useEffect(() => {
    console.log(todosToUpdate, todoList._id);
  });
  return (
    <div className="group bg-gray-50 rounded-xl w-[300px] px-4 py-4 shadow-md transition duration-300 hover:shadow-xl flex flex-col">
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
                    on
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
          <button className="flex items-center justify-center rounded-full  hover:shadow hover:bg-gray-100 h-12 w-12">
            <SaveIcon className="h-6 text-gray-500" />
          </button>
          <button className="flex items-center justify-center rounded-full  hover:shadow hover:bg-gray-100 h-12 w-12">
            <TrashIcon className="h-6 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
