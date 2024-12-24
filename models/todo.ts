import { Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  todoName: {
    type: String,
    required: [true, "Please provide a name for the todo"],
  },
});

const Todo = models.Todo || model("todo", TodoSchema);

export default Todo;
