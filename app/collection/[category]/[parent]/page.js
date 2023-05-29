import getParent from "@/libraries/getParent";
import { Suspense } from "react";
import Children from "./Children";
import getCategory from "@/libraries/getCategory";
import Link from "next/link";

export async function generateMetadata({ params: { parent } }) {
  let firstLetter = parent[0];
  firstLetter = firstLetter.toUpperCase();
  let parentName = firstLetter + parent.slice(1);

  return {
    title: `Nemesis - ${parentName}`,
  };
}

export default async function Parents(parent) {
  const currentParent = parent.params.parent;
  const currentCategory = parent.params.category;

  const categoryData = await getCategory(currentCategory);
  const categoryItem = categoryData[0];
  const parentData = await getParent(categoryItem.id, currentParent);

  const parentItem = parentData[0];
  return (
    <div
      key={parentItem.id}
      className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit"
    >
      <div className="flex justify-end items-end w-full p-4">
        <Link href={`/collection/${currentCategory}`}>
          <h2 className="px-2 py-1 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
      </div>
      <h1 className="flex-none text-xl md:mb-12 border border-x-0 border-3 border-black rounded-lg md:px-6 md:py-4">
        {parentItem.name}
      </h1>
      <p className=" h-24">{parentItem.description}</p>

      <div className="flex-initial min-h-screen w-screen">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Children
            categoryName={categoryItem.shortName}
            parentName={parentItem.shortName}
            categoryId={categoryItem.id}
            parentId={parentItem.id}
          />
        </Suspense>
      </div>
    </div>
  );
}
