import getChildren from "@/libraries/getChildren";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

export default async function Children({
  categoryName,
  parentName,
  categoryId,
  parentId,
}) {
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const childrenData = await getChildren(categoryId, parentId);

  if (!isObjEmpty(childrenData)) {
    return childrenData.map((child) => {
      return (
        <div
          key={child.id}
          className="flex flex-col justify-center items-center ps-2 text-sm mb-1 w-screen bg-neutral-100 text-neutral-900"
        >
          <div className="flex flex-col justify-center items-center w-screen">
            <Link
              href={`/collection/${categoryName}/${parentName}/${child.shortName}`}
            >
              <h1 className="text-center text-lg my-5 sm:my-9 ring ring-neutral-600 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
                {child.name}
              </h1>
            </Link>
          </div>
          <Suspense fallback={<h1>Loading...</h1>}>
            <div className="flex flex-col lg:flex-row flex-wrap justify-evenly items-center w-full lg:px-6 md:border md:border-x-0 border-neutral-800">
              {child.items.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/collection/${categoryName}/${parentName}/${child.shortName}/${item.id}`}
                  >
                    <div className="flex flex-col justify-between items-center cursor-pointer group mb-12 mt-6 md:mb-0 md:mx-6">
                      <h1 className="text-center text-md rounded-md underline underline-offset-8 group-hover:underline-offset-4 md:mb-6 md:mx-6">
                        {item.name}
                      </h1>
                      <Image
                        src={`/images/${categoryName}/${parentName}/${child.shortName}/${item.id}.png`}
                        width="200"
                        height="200"
                        alt={`${item.name}-image`}
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
  } else {
    return (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  }
}
