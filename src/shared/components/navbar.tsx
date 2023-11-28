"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { removeAccessToken } from "../utils/get-jwt";

export default function Navbar() {
  const pathname = usePathname();
  const { push } = useRouter();
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

  const logOut = () => {
    removeAccessToken();
    push("/");
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10 gap-2">
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
      <div className="flex-none hidden sm:block">
        <a className="btn btn-ghost text-xl">Task Manager</a>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="m-1 group avatar placeholder"
        >
          <div className="group-focus:ring group-focus:ring-accent group-focus:ring-offset-base-100 focus:ring-offset-2 bg-neutral text-neutral-content rounded-full w-8">
            <span className="text-xs">UI</span>
          </div>
        </div>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li onClick={logOut}>
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
