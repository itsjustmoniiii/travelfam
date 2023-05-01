import AuthLayout from "@/components/layouts/AuthLayout";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/AuthForm.module.css";
import { HiAtSymbol } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useState, useCallback } from "react";
import Input from "@/components/Input";
import { NextPageContext } from "next";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (
      values: { email: string; password: string },
      { resetForm }: FormikHelpers<{ email: string; password: string }>
    ) => {
      try {
        setIsLoading(true);

        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error("No user found");
          resetForm();
        } else {
          toast.success("Logged in");
          router.push("/");
          resetForm();
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  return (
    <>
      <AuthLayout>
        <Head>
          <title>Login</title>
        </Head>
        <section className="w-10/12 md:w-3/4 mx-auto space-y-2">
          <div className="title mb-10">
            <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
          </div>
          <div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col gap-5">
                  <div className="flex flex-col items-start">
                    <label htmlFor="email">Email</label>
                    <div className="w-full shadow-sm">
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter email..."
                        id="email"
                        className="w-full py-3 px-2 rounded-lg"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 font-normal text-[15px]"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <label htmlFor="password" className="font-normal">
                      Password
                    </label>
                    <div className="w-full shadow">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        id="password"
                        className="w-full py-3 px-2 rounded-lg"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 font-normal text-[15px]"
                    />
                  </div>
                  <button type="submit" className={styles.button}>
                    Log In
                  </button>
                </Form>
              )}
            </Formik>
            <p className="text-center text-gray-400 mt-3">
              Don&apos;t have an account?
              <Link href={"/register"}>
                <span className="text-blue-500"> Create an account</span>
              </Link>
            </p>
          </div>
        </section>
      </AuthLayout>
    </>
  );
};

export default Login;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
