// use cleint in the protected pages, SEO is not a concern for user related data
"use client";

import { isAuthenticated } from "@/shared/utils/auth";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const { push } = useRouter();

  useLayoutEffect(() => {
    isAuthenticated()
      .then((data) => {
        setIsAuthenticatedState(true);
      })
      .catch((error) => {
        //redirect
        push("/");
      });
  }, []);

  return (
    <div>
      {isAuthenticatedState ? (
        children
      ) : (
        <div className="text-center mt-32">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}
