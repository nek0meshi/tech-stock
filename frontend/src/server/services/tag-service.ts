import prisma from "@/server/lib/prisma";

export const getTags = async () => {
  const tags = await prisma.tag.findMany();
  return tags;
};

export const upsertTags = async (tags: string[]) => {
  const existingTags = await prisma.tag.findMany({
    where: {
      name: {
        in: tags,
      },
    },
  });

  const newTags = tags.filter(
    (tag) => !existingTags.some((t) => t.name === tag),
  );

  await prisma.tag.createMany({
    data: newTags.map((tag) => ({ name: tag })),
  });
};
