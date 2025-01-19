"use client";

import { useState } from "react";
import { format } from "date-fns";

const DayView = () => {
  const currentDate = new Date();
  const formatedDate = format(currentDate, "eeee, dd/MM");

  const [isEditing, setIsEditing] = useState(false);
  const [reflection, setReflection] = useState("Today was a very good day");

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="card bg-base-100 w-60 shadow-xl my-2">
        <div className="blue_topbar text-white py-4 px-6 rounded-t-lg">
          <h2 className="text-lg font-semibold flex-center">{formatedDate}</h2>
        </div>

        {/* Todos section */}
        <div className="p-4 space-y-3">
          <h1 className="text-lg font-bold">Daily Todos</h1>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span>Gør værelse rent</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span>Handle ind</span>
          </label>
        </div>

        <div className="divider"></div>

        {/* Reflection section */}
        <div className="p-4 space-y-3">
          <h1 className="text-lg font-bold">Todays reflection ☀️</h1>
          {isEditing ? (
            <textarea
              className="w-full border-2 border-blue-500 rounded h-20 hover:border-solid"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              onBlur={handleBlur}
              rows={10}
              autoFocus
            />
          ) : (
            <p
              className="hover:border-solid border-2 border-transparent cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {reflection}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
