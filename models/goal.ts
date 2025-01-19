import { Schema, model, models } from "mongoose";

interface IGoal {
  goalName: string;
  type: "weekly" | "monthly" | "yearly";
  weekNumber?: number;
  monthNumber?: number;
  year: number;
  startDate: Date;
  completed: boolean;
}

const GoalSchema = new Schema<IGoal>({
  goalName: {
    type: String,
    required: [true, "Please provide a name for the goal"],
  },
  type: {
    type: String,
    enum: ["weekly", "monthly", "yearly"],
    required: true,
  },
  weekNumber: {
    type: Number,
    required: function (this: IGoal) {
      return this.type === "weekly";
    },
  },
  monthNumber: {
    type: Number,
    required: function (this: IGoal) {
      return this.type === "monthly";
    },
  },
  year: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Goal = models.Goal || model<IGoal>("Goal", GoalSchema);

export default Goal;
