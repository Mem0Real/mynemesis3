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
  const itemsData = await getItems(categoryId, parentId, childId);
  const items = itemsData.map((item) => {
    return (
      <div
        key={item.id}
        className="flex flex-row flex-wrap justify-center items-center ps-2 text-sm mb-1 w-screen bg-neutral-300 text-neutral-900"
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
      </div>
    );
  });
  return items;
}
