import getCategories from "@/libraries/getCategories";
import Image from "next/image";
import Link from "next/link";

export default async function CollectionPage() {
  const categories = await getCategories();

  const content = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="flex flex-col justify-center items-center ps-2 text-sm mb-1 w-screen bg-neutral-300 text-neutral-900"
      >
        <div className="flex flex-col justify-center items-center w-screen">
          <Link href={`/collection/${category.shortName}`}>
            <h1 className="text-center text-lg my-5 sm:my-9 ring hover:ring-offset-4 px-5 rounded-md ring-zinc-900">
              {category.name}
            </h1>
          </Link>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-center w-screen">
          {category.parents.map((parent) => {
            return (
              <Link
                key={parent.id}
                href={`/collection/${category.shortName}/${parent.shortName}`}
              >
                <div className="flex flex-col justify-between items-center cursor-pointer group mb-12 md:mb-0">
                  <h1 className="text-center text-lg rounded-md sm:my-9 ring hover:ring-offset-4 px-5 ring-zinc-900">
                    {parent.name}
                  </h1>
                  <Image
                    src={`/images/${category.shortName}/${parent.shortName}.png`}
                    width="200"
                    height="200"
                    alt={`${parent.name}-image`}
                    className="md:mb-12 md:h-40"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-col justify-evenly items-center w-screen">
      {content}
    </div>
  );
}
