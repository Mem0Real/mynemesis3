import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { entry, name, shortName, image, description } = await request.json();
  const createEntry = await prisma[entry].create({
    data: {
      name: name,
      shortName: shortName,
      description: description,
    },
  });

  return NextResponse.json(createEntry);
}
