import React from "react";
import Image from "next/image";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { log } from "console";

const Nav = () => {
  const currentDate = new Date();
  const formatedDate = format(currentDate, "dd MMMM, yyyy");

  return (
    <nav className="flex-center w-full my-8">
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/" className="blue_btn">
            {formatedDate}
          </Link>
          <Link href="/current-week" className="blue_btn">
            Current Week
          </Link>
          <Link href="/current-month" className="blue_btn">
            Current Month
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
