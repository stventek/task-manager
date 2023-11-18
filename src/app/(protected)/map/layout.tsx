import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager - Map",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
