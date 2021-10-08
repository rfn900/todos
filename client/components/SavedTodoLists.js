import { useEffect, useState } from "react";
import { TodoListCard } from "./TodoListCard";
import { Loading } from "./Loading";

import Masonry from "react-masonry-css";
export const SavedTodoLists = ({ savedTodoLists, setSavedTodoLists }) => {
  const howManyTodos = savedTodoLists ? savedTodoLists.length : 0;
  return (
    <>
      {savedTodoLists ? (
        <Masonry
          breakpointCols={howManyTodos < 3 ? howManyTodos : 3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {savedTodoLists.map((list) => {
            return (
              <TodoListCard
                key={list._id}
                setSavedTodoLists={setSavedTodoLists}
                todoList={list}
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
