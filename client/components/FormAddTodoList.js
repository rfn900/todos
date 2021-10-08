import { DocumentAddIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
export const FormAddTodoList = ({ handleSubmit, listInputRef, todos }) => {
  return (
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
        <ReactTooltip />
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
  );
};
