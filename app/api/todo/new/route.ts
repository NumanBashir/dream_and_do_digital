import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  const { todoName } = await req.json();

  try {
    await connectToDB();
    const newTodo = new Todo({ todoName });

    await newTodo.save();
    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return new Response("Failed to create todo", { status: 500 });
  }
};
