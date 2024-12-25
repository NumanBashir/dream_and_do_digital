"use client";

import React from "react";

const CurrentMonth = () => {
  const getCurrentMonth = () => {
    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });

    return monthName;
  };

  const currentMonth = getCurrentMonth();

  return <div>Måned: {currentMonth}</div>;
};

export default CurrentMonth;
