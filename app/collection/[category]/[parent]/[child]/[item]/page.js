import getCategory from "@/libraries/getCategory";
import getParent from "@/libraries/getParent";
import getChild from "@/libraries/getChild";

import { Suspense } from "react";
import getItem from "@/libraries/getItem";
import Image from "next/image";

export async function generateMetadata({ params: { item } }) {
  let firstLetter = item[0];
  firstLetter = firstLetter.toUpperCase();
  let itemName = firstLetter + item.slice(1);

  return {
    title: `Nemesis - ${itemName}`,
  };
}

export default async function Items(item) {
  const currentCategory = item.params.category;
  const currentParent = item.params.parent;
  const currentChild = item.params.child;
  const currentItemId = item.params.item;

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

  const itemData = await getItem(
    categoryItem.id,
    parentItem.id,
    childItem.id,
    currentItemId
  );
  const itemDetail = itemData[0];

  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-white text-black">
      <Image
        src={`/images/${currentCategory}/${currentParent}/${currentChild}/${itemDetail.id}.png`}
        width="500"
        height="500"
        alt={`${itemDetail.name}-image`}
        className="md:mb-12"
      />
      <div className="flex flex-col justify-evenly items-center md:h-96 md:w-96 text-center">
        <p className="md:my-6">
          Name <br /> {itemDetail.name}
        </p>
        <p className="md:my-6">
          Type <br /> {itemDetail.type}
        </p>
        <p className="md:my-6">
          Model <br /> {itemDetail.model}
        </p>
        <p className="md:my-6 md:h-24">
          Details <br /> {itemDetail.description}
        </p>
        <p className="md:my-6">
          Quantity <br /> {itemDetail.quantity}
        </p>
        <p className="md:my-6">
          Price <br /> {itemDetail.price}
        </p>
      </div>
    </div>
  );
}
