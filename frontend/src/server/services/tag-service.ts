import prisma from "@/server/lib/prisma";

export const getTags = async () => {
  const tags = await prisma.tag.findMany();
  return tags;
};
