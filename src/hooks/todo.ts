/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, getTodos, moveTodo, removeTodo } from '~/services/todo';
import Swal from 'sweetalert2'

export function useGetTodos() {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    select: (response) => response.data,
  });

  return {
    todos: data,
    dataLoading: isLoading
  };
}

export function useMoveTodo() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['moveTodo'],
    mutationFn: moveTodo,
    onSuccess: () => queryClient.invalidateQueries(),
    onError: ()=>Swal.fire("Cant change index!")
  });

  return {
    move: mutate,
    movePending: isPending
  };
}
export function useCreateTodo(form: any) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
    
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries();
      Swal.fire("Todo Created")
    },
  });

  return {
    create: mutate,
    pending: isPending
  };
}

export function useRemoveTodo() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['removeTodo'],
    mutationFn: removeTodo,
    onSuccess: () => {queryClient.invalidateQueries(); Swal.fire("Deleted",)},
  });

  return {
    remove: mutate,
    deletePending: isPending
  };
}
