import { Loading } from "./Loading";
import Masonry from "react-masonry-css";

import { TodoNotesCard } from "./TodoNotesCard";
export const SavedTodoNotes = ({ savedTodoNotes, setSavedTodoNotes }) => {
  const howManyTodos = savedTodoNotes ? savedTodoNotes.length : 0;
  return (
    <>
      {savedTodoNotes ? (
        <Masonry
          breakpointCols={howManyTodos < 2 ? howManyTodos : 2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {savedTodoNotes.map((item) => {
            return (
              <TodoNotesCard
                key={item._id}
                setSavedTodoNotes={setSavedTodoNotes}
                todoNotes={item}
              />
            );
          })}
        </Masonry>
      ) : (
        <Loading />
      )}
    </>
  );
};
