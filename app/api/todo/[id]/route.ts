import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";

// GET todo by ID
// /api/todo/[id]
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDB();

    const { id } = await params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return new Response("Todo not found", { status: 404 });
    }

    return new Response(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    console.error("Error getting todo:", error);
    return new Response("Failed to get todo", { status: 500 });
  }
};

// UPDATE todoName and/or completed status by ID
// This API route can be used to update the todoName and/or completed status of a todo
// /api/todo/[id]
/*
    Example request body:
    {
        "todoName": "New todo name",
        "date": "04/05/2015",
        "completed": true
    }
*/
export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { todoName, completed } = await req.json();

  try {
    await connectToDB();
    const { id } = await params;
    const existingTodo = await Todo.findById(id);

    if (!existingTodo) {
      return new Response("Todo not found", { status: 404 });
    }

    if (todoName !== undefined) {
      existingTodo.todoName = todoName;
    }

    if (completed !== undefined) {
      existingTodo.completed = completed;
    }

    await existingTodo.save();

    return new Response("Updated todo: " + JSON.stringify(existingTodo), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return new Response("Failed to update todo", { status: 500 });
  }
};

// DELETE todo by ID
// /api/todo/[id]
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDB();
    const { id } = await params;
    await Todo.findByIdAndDelete(id);

    return new Response("Todo deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return new Response("Failed to delete todo", { status: 500 });
  }
};
