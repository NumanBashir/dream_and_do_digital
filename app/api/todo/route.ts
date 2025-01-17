import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { format } from "date-fns";

export const GET = async (request: any) => {
  try {
    await connectToDB();

    const todos = await Todo.find({});

    // Format the date to MM/dd/yyyy
    const formattedTodos = todos.map((todo) => ({
      ...todo.toObject(),
      date: format(new Date(todo.date), "MM/dd/yyyy"),
    }));

    return new Response(JSON.stringify(formattedTodos), { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return new Response("Failed to fetch all todos", { status: 500 });
  }
};
