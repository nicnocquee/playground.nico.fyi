"use server";

import { revalidateTag } from "next/cache";

export const refreshFavoriteAction = async (
  _prevState: any,
  _formData: FormData
) => {
  revalidateTag("favorites");
};
