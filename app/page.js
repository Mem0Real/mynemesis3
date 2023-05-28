import Sidebar from "./components/navigation/Sidebar";
import { Suspense } from "react";
import Link from "next/link";
import { Loader } from "./components/loader/Loader";

export default async function Home() {

  return (
    <main className="flex min-h-screen min-w-screen items-center justify-center text-white">
      <Suspense fallback={<Loader />}>
        <div className="flex-none">
          <Sidebar />
        </div>
      </Suspense>
      <div className="flex-initial w-full min-h-screen pt-12">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-yellow-300">Home Page</h1>
          <p>
            <Link href="/categories">Categories</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
