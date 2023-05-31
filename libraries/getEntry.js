import { prisma } from "@/db";

export default async function getEntry(
  entry,
  name,
  categoryId = null,
  parentId = null
) {
  const data = await prisma[entry].findMany({
    where: {
      AND: [
        { shortName: name },
        categoryId && { CategoryId: categoryId },
        parentId && { ParentId: parentId },
      ],
    },
  });
  data;
  return data;
}
