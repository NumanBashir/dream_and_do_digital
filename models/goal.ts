import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema({
  goalName: {
    type: String,
    required: [true, "Please provide a name for the goal"],
  },
  type: { type: String, enum: ["weekly", "monthly", "yearly"], required: true },
  weekNumber: { type: Number },
  monthNumber: { type: Number },
  year: { type: Number, required: true },
  completed: { type: Boolean, default: false },
});

const Goal = models.Goal || model("goals", GoalSchema);

export default Goal;
