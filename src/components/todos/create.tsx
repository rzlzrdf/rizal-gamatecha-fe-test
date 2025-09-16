'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateTodo } from '~/hooks/todo';
import { todoSchema, TodoSchemaType } from '~/schemas/todo';

export function TodoCreate() {
  const form = useForm<TodoSchemaType>({
    resolver: zodResolver(todoSchema),
  });

  const { create, pending } = useCreateTodo(form);

  const onSubmit = (data: TodoSchemaType) => {
    /**
     * @todo: Add the functionality to reset the form if the todo is created successfully
     */
    create(data);
  };

  return (
    <div className="max-w-[500px] w-full p-2 border border-gray-100">
      <div className="flex flex-col gap-y-2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="border px-2 rounded-sm border-gray-300 w-full h-8"
            {...form.register('title')}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="border px-2 py-1 rounded-sm border-gray-300 w-full"
            {...form.register('description')}
          />


          <div className="flex justify-end">
            <button
              type="submit"
              disabled={pending && !!form.formState.errors}
              className="px-3 py-2 bg-gray-200 text-sm hover:bg-gray-300 cursor-pointer active:scale-95 w-fit transition-transform duration-150 rounded-sm flex gap-x-2 items-center disabled:bg-white disabled:cursor-none"
            >
              💾 <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
