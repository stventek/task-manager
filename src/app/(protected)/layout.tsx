import AuthenticatedLayout from "@/shared/components/authenticated-layout";
import Navbar from "@/shared/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="bg-base-200">
      <Navbar />
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </body>
  );
}
