import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <body>{children}</body>;
}
