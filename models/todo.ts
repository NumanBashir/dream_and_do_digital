import { Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  todoName: {
    type: String,
    required: [true, "Please provide a name for the todo"],
  },
  date: {
    type: Date,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
