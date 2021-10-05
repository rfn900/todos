import { useEffect, useState } from "react";
import { TodoListCard } from "./TodoListCard";
import { Loading } from "./Loading";

export const SavedTodoLists = ({ savedTodoLists, setSavedTodoLists }) => {
  return (
    <>
      {savedTodoLists ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-12 sm:mt-24">
          {savedTodoLists.map((list) => {
            return (
              <TodoListCard
                key={list._id}
                setSavedTodoLists={setSavedTodoLists}
                todoList={list}
              />
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
