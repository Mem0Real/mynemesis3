import getParents from "@/libraries/getParents";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

export default async function Parents({ categoryName, categoryId }) {
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const parentsData = await getParents(categoryId);
  const parents = parentsData.map((parent) => {
    return (
      <div
        key={parent.id}
        className="flex flex-col justify-center items-center ps-2 text-sm mb-1 bg-neutral-100 text-neutral-900"
      >
        <div className="flex flex-col justify-center items-center">
          <Link href={`/collection/${categoryName}/${parent.shortName}`}>
            <h1 className="text-center text-lg my-5 sm:my-9 ring ring-neutral-600 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
              {parent.name}
            </h1>
          </Link>
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-center w-full lg:px-6 md:border md:border-x-0 border-neutral-800">
            {parent.children.map((child) => {
              return (
                <Link
                  key={child.id}
                  href={`/collection/${categoryName}/${parent.shortName}/${child.shortName}`}
                >
                  <div className="flex flex-col justify-evenly items-center cursor-pointer group mb-12 mt-6 md:mb-0 md:mx-6">
                    <h1 className="text-center text-lg rounded-md sm:my-9 underline underline-offset-8 hover:underline-offset-4 my-3">
                      {child.name}
                    </h1>
                    <Image
                      src={`/images/${child.shortName}/${child.shortName}.png`}
                      width="200"
                      height="200"
                      alt={`${child.name}-image`}
                      className="md:mb-12 md:h-40"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </Suspense>
      </div>
    );
  });

  return parents;
}
