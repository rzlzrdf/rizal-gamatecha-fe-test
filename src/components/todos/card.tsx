import { useMoveTodo, useRemoveTodo } from '~/hooks/todo';
import { MoveTodoType, TodoAction, TodoType } from '~/types/todo';

export interface TodoCardProps extends TodoType {
  onTodoMove: (payload: MoveTodoType) => void;
  onTodoRemove?: (id: number) => void;
}

export function TodoCard(props: TodoCardProps) {
  const { id, title, description, onTodoMove, onTodoRemove } = props;
  const { movePending } = useMoveTodo();
  const { deletePending } = useRemoveTodo();

  return (
    <div className="border border-gray-200 rounded-sm p-2 space-y-2">
      <div className="flex gap-x-2 items-center">
        <p className="flex-1">{title}</p>

        <div className="grid grid-cols-3 gap-x-2 *:w-8 *:aspect-square *:bg-gray-100 *:hover:bg-gray-200 *:rounded-sm *:cursor-pointer *:transition-colors *:duration-200">
          <button
            type="button"
            onClick={() => onTodoMove({ id, action: TodoAction.MOVE_UP })}
            disabled={movePending}
          >
            {!movePending ? '👆' : '-'}
          </button>
          <button
            type="button"
            onClick={() => onTodoMove({ id, action: TodoAction.MOVE_UP })}
            disabled={movePending}
          >
            {!movePending ? '👇' : '-'}
          </button>
          <button
            type="button"
            disabled={deletePending}
            onClick={onTodoRemove?.bind(null, id)}
          >
            {!deletePending ? '❌' : '-'}
          </button>
        </div>
      </div>

      <p className="text-sm">{description}</p>
    </div>
  );
}
