import Link from "next/link";
import React from "react";
import { PlusCircle } from "lucide-react"; // Install lucide-react if not installed

const Navbar = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-full px-8 py-3 flex items-center justify-between w-full max-w-[1000px] mx-auto mt-5">
      {/* Logo / Title */}
      <Link
        href="/"
        className="text-2xl font-bold text-black tracking-wide hover:text-gray-300 transition duration-300"
      >
        Task Manager
      </Link>

      {/* Add Task Button */}
      <Link href="/addTopic">
        <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200 transition duration-300">
          <PlusCircle className="h-5 w-5" />
          Add Task
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
