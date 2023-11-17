import type { Metadata } from "next";
import Login from "./_components/login";

export const metadata: Metadata = {
  title: "Task Manager",
};

export default function Home() {
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold">WELCOME BACK</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Login />
          </div>
        </div>
      </div>
    </main>
  );
}
