/**
 * Do not edit this source code.
 * Or, do it at your own risk.
 */

import { NextResponse } from 'next/server';
import { todoSchema } from '~/schemas/todo';
import { getTodos, replaceTodos } from './utils';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const todos = await getTodos();

  return NextResponse.json({
    data: todos,
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const validation = todoSchema.safeParse(payload);

  if (validation.error) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 },
    );
  }

  const todos = await getTodos();
  const todo = {
    id: Date.now(),
    ...validation.data,
  };

  await replaceTodos([...todos, todo]);

  return NextResponse.json({ data: todo }, { status: 201 });
}
