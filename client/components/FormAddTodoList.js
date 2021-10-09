import { DocumentTextIcon, DocumentAddIcon } from "@heroicons/react/outline";
import { ButtonMainForm } from "./ButtonMainForm";
export const FormAddTodoList = ({
  handleListClick,
  listInputRef,
  disable,
  handleNoteClick,
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
        <ButtonMainForm
          toolTipText="Add Todo Note"
          eventHandler={handleNoteClick}
          disable={disable}
          Icon={DocumentTextIcon}
        />

        <ButtonMainForm
          toolTipText="Add Todo List Item"
          eventHandler={handleListClick}
          disable={disable}
          Icon={DocumentAddIcon}
        />
      </div>
    </form>
  );
};
