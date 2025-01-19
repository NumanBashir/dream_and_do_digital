import React from "react";
import { addDays, format } from "date-fns";

const DayView = () => {
  const currentDate = new Date();
  const formatedDate = format(currentDate, "eeee, dd/MM");

  return (
    <div>
      <div className="card bg-base-100 w-60 shadow-xl my-4">
        <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
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
          <p>
            Today was very good and I kept my focus high and did not eat any
            sugar or junk food
          </p>
        </div>
      </div>
    </div>
  );
};

export default DayView;
