"use server";

import { revalidateTag } from "next/cache";

export const refreshGlobalDataAction = async (
  _prevState: any,
  _formData: FormData
) => {
  revalidateTag("globalData", "max");
};
