"use server";

import prisma from "./lib/client";

export const updateUser = async (userId: string, formData: FormData) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: `${firstName} ${lastName}`,
    },
  });
};
