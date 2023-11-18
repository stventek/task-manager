import AuthenticatedLayout from "@/shared/components/authenticated-layout";
import "../globals.css";
import Navbar from "@/shared/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-base-200">
      <body className="bg-base-200">
        <Navbar />
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      </body>
    </html>
  );
}
