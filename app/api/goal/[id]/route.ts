import Goal from "@/models/goal";
import { connectToDB } from "@/utils/database";
import {
  startOfISOWeek,
  startOfMonth,
  isValid,
  getISOWeek,
  getMonth,
} from "date-fns";

// GET todo by ID
// /api/goal/[id]
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDB();
    const { id } = await params;

    const goal = await Goal.findById(id);
    if (!goal) {
      return new Response("Goal not found", { status: 404 });
    }

    return new Response(JSON.stringify(goal), { status: 200 });
  } catch (error) {
    console.error("Error getting goal:", error);
    return new Response("Failed to get goal", { status: 500 });
  }
};

// UPDATE goalName, type, weekNumber, monthNumber, year, and/or completed status by ID
// This API route can be used to update the goalName, type, weekNumber, monthNumber, year, and/or completed status of a goal
// /api/goal/[id]
/*
    Example request body:
    {
        "goalName": "New goal name",
        "type": "weekly",
        "weekNumber": 1,
        "monthNumber": 1,
        "year": 2022,
        "completed": true
    }
*/
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const { goalName, type, weekNumber, monthNumber, year, completed } =
      await req.json();

    // Validate input
    if (!id) {
      return Response.json(
        { message: "Goal ID is required." },
        { status: 400 }
      );
    }

    if (!goalName || !type || !year) {
      return Response.json(
        { message: "goalName, type, and year are required." },
        { status: 400 }
      );
    }

    let startDate: Date | null = null;
    let calculatedWeekNumber: number | undefined = undefined;
    let calculatedMonthNumber: number | undefined = undefined;

    // Handle goal types
    if (type === "weekly") {
      if (!weekNumber || weekNumber < 1 || weekNumber > 52) {
        return Response.json(
          { message: "Invalid weekNumber. Must be between 1 and 52." },
          { status: 400 }
        );
      }
      startDate = startOfISOWeek(new Date(year, 0, 1 + (weekNumber - 1) * 7));
      calculatedWeekNumber = getISOWeek(startDate);
    } else if (type === "monthly") {
      if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
        return Response.json(
          { message: "Invalid monthNumber. Must be between 1 and 12." },
          { status: 400 }
        );
      }
      startDate = startOfMonth(new Date(year, monthNumber - 1));
      calculatedMonthNumber = getMonth(startDate) + 1;
    } else if (type === "yearly") {
      startDate = new Date(year, 0, 1); // January 1st
    }

    if (!isValid(startDate)) {
      return Response.json(
        { message: "Invalid startDate. Check your input." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Find the goal by ID
    const goal = await Goal.findById(id);
    if (!goal) {
      return Response.json({ message: "Goal not found." }, { status: 404 });
    }

    // Update the goal properties
    goal.goalName = goalName;
    goal.type = type;
    goal.weekNumber = calculatedWeekNumber;
    goal.monthNumber = calculatedMonthNumber;
    goal.year = year;
    goal.startDate = startDate;
    goal.completed = completed || false;

    // Save the updated goal
    await goal.save();

    return Response.json(goal, { status: 200 });
  } catch (error) {
    console.error("Error updating goal:", error);
    return Response.json({ message: "Failed to update goal" }, { status: 500 });
  }
};

// DELETE goal by ID
// /api/goal/[id]
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDB();
    const { id } = await params;
    await Goal.findByIdAndDelete(id);

    return new Response("Goal deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting goal:", error);
    return new Response("Failed to delete goal", { status: 500 });
  }
};
