import Link from "next/link";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function profile() {
  return (
    <div>
        <Head>
            <title>Profile</title>
        </Head>
      <section className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold mb-10">Profile Page</h3>
        <Link href={"/"}>
          <span className="px-10 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
            Home Page
          </span>
        </Link>
      </section>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // authorize user return session
  return {
    props: {
      session,
    },
  };
}
