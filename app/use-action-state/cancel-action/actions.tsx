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

  if (nameHasNumbers(name as string)) {
    return {
      data: null,
      error: "Name must not contain numbers",
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

const nameHasNumbers = (name: string) => {
  const numberRegex = /\d/;
  return numberRegex.test(name);
};
