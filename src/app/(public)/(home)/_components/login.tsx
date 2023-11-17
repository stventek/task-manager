"use client";

import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

type StringObject = { [key: string]: string };

export default function Login() {
  const [error, setError] = useState<StringObject>({});
  const { push } = useRouter();

  return (
    <Formik
      initialValues={{ username: "", password: "", remember: false }}
      validate={(values) => {
        const errors: StringObject = {};
        if (!values.username) {
          errors.username = "Required";
        }
        if (!values.password) {
          errors.password = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post<{ access: string; refresh: string }>(
            process.env.NEXT_PUBLIC_API_BASE + "/api/token/",
            {
              username: values.username,
              password: values.password,
            }
          )
          .then((response) => {
            setSubmitting(false);
            localStorage.setItem("accessToken", response.data.access);
            push("/board");
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);
            if (err.response.status === 401) {
              setError({ message: "Wrong Username or Password" });
            }
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="card-body" onSubmit={handleSubmit}>
          {error.message ? (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error.message}</span>
            </div>
          ) : undefined}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              name="username"
              type="text"
              placeholder="Enter your Username"
              className={`input input-bordered ${
                errors.username && touched.username ? "input-error" : ""
              }`}
              required
            />
            {touched.username && errors.username}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              placeholder="Enter your Password"
              className={`input input-bordered ${
                errors.password && touched.password ? "input-error" : ""
              }`}
              required
            />
            {touched.password && errors.password}
          </div>
          <div className="form-control">
            <label className="label justify-normal cursor-pointer gap-4">
              <input
                name="remember"
                type="checkbox"
                className="checkbox"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.remember}
              />
              <span className="label-text">Remember me</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Login
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : undefined}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
