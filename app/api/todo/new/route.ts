import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { parse, isValid } from "date-fns";

export const POST = async (req: Request) => {
  const { todoName, date, completed } = await req.json();

  // Parse the string date into a JavaScript Date object
  const parsedDate = parse(date, "MM/dd/yyyy", new Date());
  if (!isValid(parsedDate)) {
    return new Response("Invalid date format", { status: 400 });
  }

  try {
    await connectToDB();
    const newTodo = new Todo({ todoName, date: parsedDate, completed });

    await newTodo.save();
    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return new Response("Failed to create todo", { status: 500 });
  }
};
