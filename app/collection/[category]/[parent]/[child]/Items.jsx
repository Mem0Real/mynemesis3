import getItems from "@/libraries/getItems";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

export default async function Items({
  categoryName,
  parentName,
  childName,
  categoryId,
  parentId,
  childId,
}) {
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const itemsData = await getItems(categoryId, parentId, childId);
  if (!isObjEmpty(itemsData)) {
    return (
      <div className="flex flex-col flex-wrap justify-center items-center ps-2 text-sm mb-1 w-screen bg-neutral-300 text-neutral-900">
        <div className="flex items-end justify-end w-screen md:px-12 px-4 -mt-10 mb-6 md:-mt-28 md:mb-12">
          <Link href={`/collection/${categoryName}/${parentName}`}>
            <h2 className="text-sm px-2 py-1 mt-4 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
              Go Back
            </h2>
          </Link>
        </div>
        {itemsData.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center"
            >
              <Link
                href={`/collection/${categoryName}/${parentName}/${childName}/${item.id}`}
              >
                <div className="flex flex-col justify-center items-center w-fit">
                  <h1 className="text-center text-lg my-5 underline underline-offset-8 hover:underline-offset-4">
                    {item.name}
                  </h1>
                </div>
              </Link>
              <Image
                src={`/images/${categoryName}/${parentName}/${childName}/${item.id}.png`}
                width="200"
                height="200"
                alt={`${item.name}-image`}
                className="md:mb-12 md:h-40"
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <Link href={`/collection/${categoryName}/${parentName}`}>
          <h2 className="block md:absolute z-0 top-20 right-0 px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
        <h1>Empty</h1>
      </div>
    );
  }
}
