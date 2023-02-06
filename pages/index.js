import Head from 'next/head'
import Link from 'next/link';
import { getSession, useSession, signOut } from "next-auth/react";

export default function Home() {
  
  const {data: session} = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div>
      <Head>
        <title>Next Auth App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? <User session={session} handleSignOut={handleSignOut} /> : <Guest />}
    </div>
  );
}


// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center mt-5">
        <Link href={"/login"}>
          <span className="px-10 py-2 rounded-md bg-indigo-500 text-gray-50">
            Sign In
          </span>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details my-4">
        <h5 className="font-sans text-zinc-900 font-medium">
          {session.user.name}
        </h5>
        <h5 className="font-sans text-zinc-900 font-medium">
          {session.user.email}
        </h5>
      </div>

      <div className="flex justify-center my-10">
        <Link href={"/profile"}>
          <span className="px-10 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
            View Profile
          </span>
        </Link>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-2 rounded-md bg-indigo-500 text-gray-50"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}

// export async function getServerSideProps({context}){
//   const session = await getSession({ context });

//   if (!session){
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {session}
//   };
// }