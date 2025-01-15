"use client";

import React, { useState, useEffect } from "react";
import { getISOWeek } from "date-fns";

const CurrentWeek: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    const weekNumber = getISOWeek(today);
    setCurrentWeek(weekNumber);
  }, []);

  return <div>Week nr: {currentWeek}</div>;
};

export default CurrentWeek;
