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
  const childrenData = await getChildren(categoryId, parentId);
  const children = childrenData.map((child) => {
    return (
      <div
        key={child.id}
        className="flex flex-col justify-center items-center ps-2 text-sm mb-1 w-screen bg-neutral-300 text-neutral-900"
      >
        <div className="flex flex-col justify-center items-center w-screen">
          <Link
            href={`/collection/${categoryName}/${parentName}/${child.shortName}`}
          >
            <h1 className="text-center text-lg my-5 underline underline-offset-8 hover:underline-offset-4">
              {child.name}
            </h1>
            <p className=" h-24">{child.description}</p>
          </Link>
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className="flex flex-wrap  justify-evenly items-center w-screen">
            {child.items.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/collection/${categoryName}/${parentName}/${child.shortName}/${item.shortName}`}
                >
                  <div className="flex flex-col justify-between items-center cursor-pointer group">
                    <h1 className="text-center text-lg rounded-md underline underline-offset-8 group-hover:underline-offset-4 md:mb-6">
                      {item.name}
                    </h1>
                    <Image
                      src={`/images/${categoryName}/${parentName}/${child.shortName}/${item.shortName}.png`}
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
  return children;
}
