import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema({
  goalName: {
    type: String,
    required: [true, "Please provide a name for the goal"],
  },
});

const Goal = models.Goal || model("goals", GoalSchema);

export default Goal;
