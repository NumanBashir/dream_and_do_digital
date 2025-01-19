"use client";

import React, { useState, useEffect } from "react";
import { getISOWeek } from "date-fns";
import DayView from "@/components/DayView";

const CurrentWeek: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    const weekNumber = getISOWeek(today);
    setCurrentWeek(weekNumber);
  }, []);

  return (
    <>
      <div>Week nr: {currentWeek}</div>
      <div className="basis-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
        <DayView />
        <DayView />
        <DayView />
        <DayView />
        <DayView />
        <DayView />
        <DayView />
      </div>
    </>
  );
};

export default CurrentWeek;
