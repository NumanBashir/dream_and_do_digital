import { NextRequest, NextResponse } from "next/server";
import {
  startOfISOWeek,
  startOfMonth,
  getISOWeek,
  getMonth,
  isValid,
} from "date-fns";
import Goal from "@/models/goal";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  try {
    const { goalName, type, weekNumber, monthNumber, year, completed } =
      await req.json();

    // Validate input
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

    // Create and save the goal
    const newGoal = new Goal({
      goalName,
      type,
      weekNumber: calculatedWeekNumber,
      monthNumber: calculatedMonthNumber,
      year,
      startDate,
      completed: completed || false,
    });

    await newGoal.save();
    return Response.json(newGoal, { status: 201 });
  } catch (error) {
    console.error("Error creating goal:", error);
    return Response.json({ message: "Failed to create goal" }, { status: 500 });
  }
};

// {
//   "goalName": "Complete 3 workouts",
//   "type": "weekly",
//   "weekNumber": 4,
//   "year": 2025,
//   "completed": false
// }

// {
//   "goalName": "Read 2 books",
//   "type": "monthly",
//   "monthNumber": 2,
//   "year": 2025,
//   "completed": true
// }

// {
//   "goalName": "Get a promotion",
//   "type": "yearly",
//   "year": 2025
// }
