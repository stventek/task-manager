// use cleint in the protected pages, SEO is not a concern for user related data
"use client";

import "../globals.css";
import Navbar from "@/shared/components/navbar";
import { isAuthenticated } from "@/shared/utils/auth";
import { useLayoutEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  useLayoutEffect(() => {
    isAuthenticated()
      .then((data) => {
        //redirect
        setIsAuthenticatedState(true);
      })
      .catch((error) => {
        //redirect
        console.log("redirect home which is login bascially");
      });
  }, []);

  return (
    <html lang="en" className="bg-base-200">
      <body className="bg-base-200">
        {isAuthenticatedState ? <Navbar /> : ""}
        {isAuthenticatedState ? children : ""}
        {isAuthenticatedState ? (
          children
        ) : (
          <div className="text-center mt-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </body>
    </html>
  );
}
