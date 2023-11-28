import Link from "next/link";

export default function Custom404() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">
            This page is not available. Verify that the link you want to open is
            correct.
          </p>
          <Link href={"/"} className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
