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
        className="flex flex-col justify-center items-center ps-2 text-sm mb-1 w-screen bg-neutral-300 text-neutral-900"
      >
        <div className="flex flex-col justify-center items-center w-screen">
          <Link href={`/collection/${categoryName}/${parent.shortName}`}>
            <h1 className="text-center text-lg my-5 sm:my-9 ring hover:ring-offset-4 px-5 rounded-md ring-zinc-900">
              {parent.name}
            </h1>
          </Link>
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-center w-screen">
            {parent.children.map((child) => {
              return (
                <Link
                  key={child.id}
                  href={`/collection/${categoryName}/${parent.shortName}/${child.shortName}`}
                >
                  <div className="flex flex-col justify-between items-center cursor-pointer group">
                    <h1 className="text-center text-lg rounded-md underline underline-offset-8 group-hover:underline-offset-4 md:mb-6">
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
