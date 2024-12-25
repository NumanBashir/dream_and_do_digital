"use client";

import React from "react";
import { getISOWeek } from "date-fns";

const CurrentWeek = () => {
  const getCurrentWeek = () => {
    const today = new Date();
    const weekNumber = getISOWeek(today);

    return weekNumber;
  };

  const currentWeek = getCurrentWeek();

  return <div>Uge nr: {currentWeek}</div>;
};

export default CurrentWeek;
