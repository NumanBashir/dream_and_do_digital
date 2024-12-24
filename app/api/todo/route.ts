import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";

export const GET = async (request: any) => {
  try {
    await connectToDB();

    const todos = await Todo.find({});

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return new Response("Failed to fetch all todos", { status: 500 });
  }
};
