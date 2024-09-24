"use server";

export const doSomething = async (_prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const name = formData.get("name");

  if (!name) {
    return {
      data: null,
      error: "Name is required",
    };
  }
  return {
    data: {
      status: "ok",
      message: `Hello ${name}`,
      name,
    },
    error: null,
  };
};
