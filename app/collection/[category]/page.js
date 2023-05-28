import getCategory from "@/libraries/getCategory";
import Parents from "./Parents";
import { Suspense } from "react";

export async function generateMetadata({ params: { category } }) {
  let firstLetter = category[0];
  firstLetter = firstLetter.toUpperCase();
  let categoryName = firstLetter + category.slice(1);

  return {
    title: `Nemesis - ${categoryName}`,
  };
}

export default async function Category(category) {
  const currentCategory = category.params.category;
  const categoryData = await getCategory(currentCategory);
  const categoryItem = categoryData[0];

  return (
    <div
      key={categoryItem.id}
      className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit"
    >
      <h1 className="flex-none text-xl md:mb-12 border border-t-0 border-3 border-black rounded-lg md:px-6 md:py-4">
        {categoryItem.name}
      </h1>
      <div className="flex-initial min-h-screen w-screen">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Parents
            categoryName={categoryItem.shortName}
            categoryId={categoryItem.id}
          />
        </Suspense>
      </div>
    </div>
  );
}