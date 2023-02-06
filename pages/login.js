import Head from "next/head"
import Link from "next/link"
import Layout from "../layout/layout"
import styles from "../styles/Form.module.css"
import Image from "next/image"
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react"
import { signIn } from "next-auth/react";
import { useFormik } from "formik"
import login_validate from "../lib/validate"
import { useRouter } from "next/router"

export default function Login(){
    const [show, setShow] = useState(false);
    const router = useRouter();
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate:login_validate,
      onSubmit
    })

    console.log(formik.errors)

    async function onSubmit(values){
      const status = await signIn('credentials',{
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/"
      })
      if(status.ok) router.push(status.url)
    }

    // Google handler function 
    async function handleGoogleSignIn(){
      signIn('google',{callbackUrl: "http://localhost:3000"})
    }

    // Github handler function
    async function handleGithubSignIn(){
      signIn("github", { callbackUrl: "http://localhost:3000" });
    }

    return (
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <section className="w-4/5 mx-auto flex flex-col gap-4">
          <div className="title">
            <h1 className="text-gray-800 text-2xl font-bold py-2">Explore</h1>
            <p className="w-4/5 mx-auto text-gray-400 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              expedita?
            </p>
          </div>

          {/* form */}
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                className={styles.input_text}
                type="email"
                name="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={18} />
              </span>
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                className={styles.input_text}
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4 "
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint
                  className="cursor-pointer hover:text-indigo-500"
                  size={18}
                />
              </span>
            </div>

            {/* login buttons */}
            <div className="input-button">
              <button className={styles.button} type="submit">
                Login
              </button>
            </div>
            <div className="input-button">
              <button
                className={styles.button_custom}
                type="button"
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
                <Image
                  src={"/assets/google.svg"}
                  width="18"
                  height="18"
                  alt="google"
                />
              </button>
            </div>
            <div className="input-button">
              <button
                className={styles.button_custom}
                type="button"
                onClick={handleGithubSignIn}
              >
                Sign in with Github
                <Image
                  src={"/assets/github.svg"}
                  width="18"
                  height="18"
                  alt="github"
                />
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400 text-xs">
            don&apos;t have an account yet?
            <Link href="/register">
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </p>
        </section>
      </Layout>
    );
}