import Category from "../Category";
import { Suspense } from "react";
import { Loader } from "../loader/Loader";

export default async function Sidebar() {
  return (
    <section className="w-fit h-fit min-h-screen border-r z-10 border-black rounded-r-3xl rounded-t-none bg-neutral-900 text-white">
      <h1 className="text-2xl font-medium underline mb-12 text-center italic shadow-md shadow-neutral-100 pt-4 pb-2 px-4 rounded-b-3xl border-2 border-t-0 border-black w-fit mx-auto">
        Categories
      </h1>
      <Suspense fallback={<Loader />}>
        <Category />
      </Suspense>
    </section>
  );
}
