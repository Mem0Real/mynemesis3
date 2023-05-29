import { prisma } from "@/db";

export default async function getAllCategories() {
  const categories = await prisma.categories.findMany({
    include: {
      parents: true,
      children: true,
      items: true,
    },
  });
  return categories;
}
