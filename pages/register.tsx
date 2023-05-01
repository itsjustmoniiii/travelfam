import Head from "next/head";
import Link from "next/link";
import styles from "../styles/AuthForm.module.css";
import { HiAtSymbol, HiOutlineUser } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";
import Input from "@/components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession, signIn } from "next-auth/react";
import { NextPageContext } from "next";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import useTrendingUsers from "@/hooks/useTrendingUsers";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .max(15, "Has to be between 4 and 15 characters long")
    .min(4, "Has to be between 4 and 15 characters long")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password has to be between 6 and 20 characters")
    .max(20, "Password has to be between 6 and 20 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFetchedTrendingUsers } = useTrendingUsers();

  const handleSubmit = useCallback(
    async (
      values: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
      },
      {
        resetForm,
      }: FormikHelpers<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
      }>
    ) => {
      try {
        setIsLoading(true);
        await axios.post("api/register", {
          email: values.email,
          username: values.username,
          password: values.password,
        });

        toast.success("Account created");

        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        router.push("/");
        mutateFetchedTrendingUsers();
        resetForm();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
        resetForm();
      }
      setIsLoading(false);
    },
    [router, mutateFetchedTrendingUsers]
  );

  return (
    <>
      <AuthLayout>
        <Head>
          <title>Register</title>
        </Head>
        <section className="w-3/4 mx-auto space-y-1">
          <div className="title mb-10">
            <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          </div>
          <div>
            <Formik
              validateOnChange={true}
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col gap-5">
                  <div className="flex flex-col items-start">
                    <label htmlFor="username">Username</label>
                    <div className="w-full shadow-sm">
                      <Field
                        type="text"
                        name="username"
                        placeholder="Enter username..."
                        id="username"
                        className="w-full py-3 px-2 rounded-lg"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-400 font-normal text-[15px]"
                    />
                  </div>
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
                  <div className="flex flex-col items-start">
                    <label htmlFor="confirmPassword" className="font-normal">
                      Confirm Password
                    </label>
                    <div className="w-full shadow">
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password..."
                        id="confirmPassword"
                        className="w-full py-3 px-2 rounded-lg"
                      />
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-400 font-normal text-[15px]"
                    />
                  </div>
                  <button type="submit" className={styles.button}>
                    Register
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-center text-gray-400 mt-3">
              Already have an account?
              <Link href={"/login"}>
                <span className="text-blue-500"> Log In</span>
              </Link>
            </p>
          </div>
        </section>
      </AuthLayout>
    </>
  );
};

export default Register;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
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
