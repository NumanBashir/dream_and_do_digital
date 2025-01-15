"use client";

import React, { useState, useEffect } from "react";

const CurrentMonth: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  return <div>Month: {currentMonth}</div>;
};

export default CurrentMonth;
