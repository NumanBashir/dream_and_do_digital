import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { parse, isValid } from "date-fns";

// {
//   "todoName": "Læs alle namaaz test",
//   "date": "04/05/2015"
// }

export const POST = async (req: Request) => {
  const { todoName, date, completed } = await req.json();

  var parsedDate = new Date();
  if (date) {
    parsedDate = parse(date, "MM/dd/yyyy", new Date());
    if (!isValid(parsedDate)) {
      return new Response("Invalid date format", { status: 400 });
    }
  }

  try {
    await connectToDB();
    const newTodo = new Todo({
      todoName,
      date: parsedDate,
      completed,
    });
    await newTodo.save();
    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return new Response("Failed to create todo", { status: 500 });
  }
};
