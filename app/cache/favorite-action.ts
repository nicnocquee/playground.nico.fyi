"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { toggleFavorite } from "./data-source";

export const updateFavoriteAction = async (
  _prevState: any,
  formData: FormData
) => {
  const userId = formData.get("userId") as string | null;
  const albumId = formData.get("albumId") as string | null;

  if (userId === null || albumId === null) {
    throw new Error("Invalid form data.");
  }

  await toggleFavorite(parseInt(userId), parseInt(albumId));

  revalidateTag("favorites");
};
