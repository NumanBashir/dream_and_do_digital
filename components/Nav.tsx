import React from "react";
import Image from "next/image";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { log } from "console";

const Nav = () => {
  const currentDate = new Date();
  const formatedDate = format(currentDate, "dd MMMM, yyyy");

  return (
    <nav className="flex-between w-full mb-8 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/book-svgrepo-com.svg"
          alt="Dream & Do Digital Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p>Dream & Do Digital</p>
      </Link>
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/" className="blue_btn">
            {formatedDate}
          </Link>
          <Link href="/services" className="blue_btn">
            Current Week
          </Link>
          <Link href="/contact" className="blue_btn">
            Current Month
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
