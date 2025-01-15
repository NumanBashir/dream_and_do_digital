import { Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  todoName: {
    type: String,
    required: [true, "Please provide a name for the todo"],
  },
  date: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false, // New todos are incomplete by default
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
