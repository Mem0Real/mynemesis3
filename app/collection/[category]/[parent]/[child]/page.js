import getCategory from "@/libraries/getCategory";
import getParent from "@/libraries/getParent";
import getChild from "@/libraries/getChild";

import { Suspense } from "react";
import Items from "./Items";
import Loading from "./loading";

export async function generateMetadata({ params: { child } }) {
  let firstLetter = child[0];
  firstLetter = firstLetter.toUpperCase();
  let childName = firstLetter + child.slice(1);

  return {
    title: `Nemesis - ${childName}`,
  };
}

export default async function Children(child) {
  const currentCategory = child.params.category;
  const currentParent = child.params.parent;
  const currentChild = child.params.child;

  const categoryData = await getCategory(currentCategory);
  const categoryItem = categoryData[0];

  const parentData = await getParent(categoryItem.id, currentParent);
  const parentItem = parentData[0];

  const childData = await getChild(
    categoryItem.id,
    parentItem.id,
    currentChild
  );
  const childItem = childData[0];

  return (
    <div
      key={childItem.id}
      className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit"
    >
      <h1 className="flex-none text-xl md:mb-12 border border-t-0 border-3 border-black rounded-lg md:px-6 md:py-4">
        {childItem.name}
      </h1>
      <div className="flex-initial min-h-screen w-screen">
        <div className="flex">
          <Suspense fallback={<Loading />}>
            <Items
              categoryName={categoryItem.shortName}
              parentName={parentItem.shortName}
              childName={childItem.shortName}
              categoryId={categoryItem.id}
              parentId={parentItem.id}
              childId={childItem.id}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
