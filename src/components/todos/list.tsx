'use client';

import {
  useDeferredValue,
  unstable_ViewTransition as ViewTransition,
} from 'react';
import { useGetTodos, useMoveTodo, useRemoveTodo } from '~/hooks/todo';
import { TodoCard } from './card';

export interface TodoListProps {}

export function TodoList(_: TodoListProps) {
  const { todos, dataLoading } = useGetTodos();
  const deferredTodos = useDeferredValue(todos);

  const { move } = useMoveTodo();
  const { remove } = useRemoveTodo();
  if(dataLoading) return (
    <div className="max-w-[500px] min-h-[300px] w-full p-2 space-y-2 border border-gray-100 grid place-content-center">
      <p>Loading...</p>
    </div>
  )

  return (
    <div className="max-w-[500px] w-full p-2 space-y-2 border border-gray-100">
      {deferredTodos?.length === 0 ? (
        <div className="h-full flex items-center justify-center py-8">
          <p>🙏 Tidak ada todo</p>
        </div>
      ) : (
        deferredTodos?.map((todo) => (
          <ViewTransition key={todo.id}>
            <TodoCard
              {...todo}
              key={todo.id}
              /**
               * @todo: Fix this error for onTodoMove
               */
              onTodoMove={move}
              onTodoRemove={remove}
            />
          </ViewTransition>
        ))
      )}
    </div>
  );
}
