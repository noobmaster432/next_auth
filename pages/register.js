import Head from "next/head";
import Link from "next/link";
import Layout from "../layout/layout";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import register_validate from "../lib/validate";
import { useRouter } from "next/router";

export default function Register() {
  const [show, setShow] = useState({password:false,cpassword:false});
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }

    await fetch("/api/auth/signup", option)
      .then(res => res.json())
      .then((data)=>{
        if(data) router.push("/login")
      })
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-4/5 mx-auto flex flex-col gap-4">
        <div className="title">
          <h1 className="text-gray-800 text-2xl font-bold py-2">Register</h1>
          <p className="w-4/5 mx-auto text-gray-400 text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
            expedita?
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={16} />
            </span>
          </div>
          {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={18} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={16} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={16} />
            </span>
          </div>
          {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

          {/* login buttons */}
          <div className="input-button mt-2">
            <button className={styles.button} type="submit">
              Sign Up
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 text-xs">
          already have an account?
          <Link href="/login">
            <span className="text-blue-700"> Sign In</span>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
