import { SaveIcon, TrashIcon } from "@heroicons/react/outline";
import { useState, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { MDEditor } from "./Markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { deleteTodos, updateTodos, fetchTodos } from "../utils/apiCalls";
import { EditBox } from "./EditBox";

export const TodoNotesCard = ({ todoNotes, setSavedTodoNotes }) => {
  const [todosToUpdate, setTodosToUpdate] = useState(todoNotes.notes);
  const [editMode, setEditMode] = useState(false);
  const [savingStatus, setSavingStatus] = useState({
    date: todoNotes.dateLastEdited,
    message: "Last edited at:",
  });

  const editBoxRef = useRef();
  return (
    <>
      <div className="group  bg-gray-50 rounded-xl w-[500px] px-8 pt-6 pb-4 shadow-md transition duration-300 hover:shadow-xl flex flex-col">
        <div
          onClick={() => setEditMode(!editMode)}
          className="w-full pb-8 wmde-markdown wmde-markdown-color"
        >
          <ReactMarkdown children={todosToUpdate} remarkPlugins={[remarkGfm]} />
        </div>
        <div className="w-full h-10 px-2 mt-auto bg-gray-50">
          <div className="flex items-center justify-between w-full h-full opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="block font-mono text-gray-500">
              <p className="text-sm">{savingStatus.message}</p>
              <p className="text-xs">
                {savingStatus.date &&
                  new Date(savingStatus.date).toLocaleString()}
              </p>
            </div>
            <ReactTooltip />
            <button
              data-tip="Delete Notes"
              data-type="dark"
              data-place="bottom"
              data-effect="solid"
              onClick={async () => {
                await deleteTodos(todoNotes._id, "notes");
                fetchTodos("notes").then(setSavedTodoNotes);
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full hover:shadow hover:bg-gray-100"
            >
              <TrashIcon className="h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={editBoxRef}
        onClick={(e) => {
          if (editBoxRef.current === e.target) {
            const confirm =
              todoNotes.notes !== todosToUpdate
                ? window.confirm("Discard all changes?")
                : true;
            confirm && setTodosToUpdate(todoNotes.notes);
            confirm && setEditMode(!editMode);
          }
        }}
        className={`fixed inset-0 bg-gray-700 bg-opacity-30 z-10 ${
          editMode ? "" : "hidden"
        }`}
      >
        <div className="absolute rounded-xl overflow-hidden shadow-xl w-[600px] h-auto top-1/2 transition left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100">
          {todosToUpdate && (
            <MDEditor
              height={400}
              preview="edit"
              value={todosToUpdate}
              onChange={setTodosToUpdate}
            />
          )}
          <div className="flex items-center justify-between w-full px-12 py-4">
            <div className="block font-mono text-gray-500">
              <p className="text-sm">{savingStatus.message}</p>
              <p className="text-xs">
                {savingStatus.date &&
                  new Date(savingStatus.date).toLocaleString()}
              </p>
            </div>
            <ReactTooltip />
            <SaveIcon
              data-tip="Save & Exit"
              data-type="dark"
              data-place="left"
              data-effect="solid"
              data-class="text-sm"
              onClick={async () => {
                const payload = {
                  notes: todosToUpdate,
                  dateLastEdited: new Date(),
                };
                await updateTodos(todoNotes._id, payload, "notes");
                setEditMode(false);
              }}
              className="h-10 hover:bg-yellow-400 hover:bg-opacity-50 cursor-pointer transition rounded-full p-2 text-gray-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};