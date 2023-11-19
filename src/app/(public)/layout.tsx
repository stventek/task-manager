"use client";

import { getAccessToken } from "@/shared/utils/get-jwt";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const [hasJWT, setHasJWT] = useState(true);

  useLayoutEffect(() => {
    if (getAccessToken()) push("/board");
    else setHasJWT(false);
  }, []);

  if (hasJWT) return <body></body>;

  return <body>{children}</body>;
}
