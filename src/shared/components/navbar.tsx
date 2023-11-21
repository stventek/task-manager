"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    let pathName = pathname!.split("/")[1];
    if (pathName === "map") {
      pathName = "Map";
    } else {
      pathName = "Board";
    }
    setName(pathName);
  }, [pathname]);

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10">
      <div className="flex-none">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={(e: any) => e.target.blur()}>
              <Link href={"/board"}>Board</Link>
            </li>
            <li onClick={(e: any) => e.target.blur()}>
              <Link href={"/map"}>Map Route</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-2xl">{name}</div>
      </div>
      <div className="flex-none">
        <a className="btn btn-ghost text-xl">Task Manager</a>
      </div>
    </div>
  );
}
