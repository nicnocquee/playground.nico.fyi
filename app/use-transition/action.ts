"use server";

export const doSomething = async (id: string) => {
  console.log("doSomething", id);
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, Math.floor(Math.random() * 10000));
  });
  console.log("doSomething done", id);

  return { status: 1, id };
};
