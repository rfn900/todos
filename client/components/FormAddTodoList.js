import { DocumentTextIcon, DocumentAddIcon } from "@heroicons/react/outline";
import { ButtonMain } from "./ButtonMain";
export const FormAddTodoList = ({
  handleListClick,
  listInputRef,
  disable,
  handleNotesClick,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="">
      <div className="flex justify-between w-full px-4">
        <input
          ref={listInputRef}
          required
          className="w-full font-bold text-gray-600 placeholder-gray-600 border-transparent focus:ring-transparent focus:border-transparent"
          type="text"
          name="todo_add"
          placeholder="Todo List Title..."
        />
        <ButtonMain
          toolTipText="Add Todo Note"
          eventHandler={handleNotesClick}
          disable={disable}
          Icon={DocumentTextIcon}
        />

        <ButtonMain
          toolTipText="Add Todo List Item"
          eventHandler={handleListClick}
          disable={disable}
          Icon={DocumentAddIcon}
        />
      </div>
    </form>
  );
};
